from flask import redirect, request, jsonify, Blueprint, render_template, url_for
from api.models import db, User, Juego, Carrito, DetalleOrden, OrdenCompra, Contacto
from api.utils import APIException
from flask_cors import CORS
from datetime import datetime, timedelta
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
import smtplib
import os
from flask_login import login_required, login_user, LoginManager # type:ignore


api = Blueprint('api', __name__, template_folder='templates')

api.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')

# Allow CORS requests to this API
CORS(api)

login_manager = LoginManager()
login_manager.init_app(api)

@api.route('/admin')
@login_required
def admin():
    return redirect(url_for('admin.index'))

# Juego routes
@api.route('/juegos', methods=['GET'])
def list_juegos():
    juegos = Juego.query.all()
    juegos_list = []
    for juego in juegos:
        datos_juego = {
            'id': juego.id,
            'titulo': juego.titulo,
            'descripcion': juego.descripcion,
            'precio': juego.precio,
            'tiempo_juego': juego.tiempo_juego,
            'modalidad': juego.modalidad,
            'categoria': juego.categoria,
            'imagen_url': juego.imagen_url,
            'existencias': juego.existencias

        }
        juegos_list.append(datos_juego)
    return jsonify(juegos_list), 200


@api.route('/juego/<int:juego_id>', methods=['GET'])
def get_juego_detail(juego_id):
    juego = Juego.query.get(juego_id)
    if not juego:
        raise APIException('Juego not found', status_code=404)

    datos_juego = {
        'id': juego.id,
        'titulo': juego.titulo,
        'descripcion': juego.descripcion,
        'precio': juego.precio,
        'tiempo_juego': juego.tiempo_juego,
        'modalidad': juego.modalidad,
        'categoria': juego.categoria,
        'imagen_url': juego.imagen_url,
        'existencias': juego.existencias
    }

    return jsonify(datos_juego), 200


@api.route('/orden', methods=['POST'])
def create_orden():
    data = request.json

    fecha_compra = datetime.utcnow()

    nueva_orden = OrdenCompra(
        fecha_compra=fecha_compra,
        total=sum(item['precio'] * item.get('cantidad', 1)
                  for item in data['carrito']),
        estado='pendiente',
        nombre_cliente=data['nombre_cliente'],
        direccion_cliente=data['direccion_cliente'],
        region_cliente=data['region_cliente'],
        comuna_cliente=data['comuna_cliente'],
        telefono_cliente=data['telefono_cliente'],
        email_cliente=data['email_cliente'],
        comprobanteImg_url=data['comprobante_image_url']
    )
    db.session.add(nueva_orden)
    db.session.flush()

    identificador = uuid.uuid4()

    for item in data['carrito']:
        juego = Juego.query.filter_by(titulo=item['titulo']).first()
        if not juego:
            raise APIException(f"Juego with title '{
                               item['titulo']}' not found", status_code=404)

        detalle = DetalleOrden(
            orden_id=nueva_orden.id,
            juego_id=juego.id,
            # Assuming `cantidad` might be in the payload
            cantidad=item.get('cantidad', 1)
        )
        db.session.add(detalle)

        carrito_item = Carrito(
            identificador=identificador,
            juego_id=juego.id,
            # Adjusting based on potential quantity in payload
            cantidad=item.get('cantidad', 1)
        )
        db.session.add(carrito_item)

    db.session.commit()

    s = smtplib.SMTP(os.getenv("SMTP_HOST"), os.getenv("SMTP_PORT"))
    s.starttls()
    s.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASSWORD"))

    message = f"Subject: Nueva orden de compra\n\nNueva orden de compra con id {
        nueva_orden.id} ha sido creada. Revisar en el panel de administrador."
    message += f"\n\nURL de la imagen del comprobante: {
        data['comprobante_image_url']}"
    message += f"\nFecha de creación de la orden de compra: {
        fecha_compra.strftime('%Y-%m-%d %H:%M:%S')}"

    message = message.encode('utf-8')

    s.sendmail(os.getenv("SMTP_USER"), data['email_cliente'], message)
    s.quit()

    return jsonify(nueva_orden.serialize()), 201


@api.route('/login', methods=['GET', 'POST'])
def login():
    """
    Maneja las solicitudes de inicio de sesión.

    - Renderiza el formulario de inicio de sesión en solicitudes GET.
    - Valida las credenciales del usuario y redirige a la página de administración si el inicio de sesión es exitoso.
    - Muestra un mensaje de error si las credenciales son inválidas.
    """

    if request.method == 'GET':
        return render_template('login.html')

    elif request.method == 'POST':
        # Obtener correo electrónico y contraseña del formulario
        email = request.form['email']
        password = request.form['password']

        # Buscar al usuario por correo electrónico
        user = User.query.filter_by(email=email).first()

        # Verificar si el usuario existe y la contraseña es correcta
        if user and user.password_hash == password:
            # Inicio de sesión exitoso
            # Redirigir a la página de administración
            login_user(user)
            return redirect(url_for('admin.index'))
        else:
            # Inicio de sesión fallido
            error = 'Credenciales inválidas'
            return render_template('login.html', error=error)

    else:
        return 'Método no permitido', 405

@api.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    """
    Maneja las solicitudes de restablecimiento de contraseña.

    - Renderiza el formulario de restablecimiento de contraseña en solicitudes GET.
    - Envía un correo electrónico con un enlace de restablecimiento de contraseña si el correo electrónico es válido.
    - Muestra un mensaje de éxito si el correo electrónico es válido y se envió el correo electrónico.
    - Muestra un mensaje de error si el correo electrónico no es válido.
    """

    if request.method == 'GET':
        return render_template('forgot_password.html')

    elif request.method == 'POST':
        # Obtener correo electrónico del formulario
        email = request.form['email']

        # Buscar al usuario por correo electrónico
        user = User.query.filter_by(email=email).first()

        # Verificar si el usuario existe
        if user:
            # Generar un token de restablecimiento de contraseña (puedes usar JWT o cualquier otro método)
            # reset_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))

            # Construir la URL de restablecimiento de contraseña con el correo electrónico como parámetro
            reset_url = f'http://localhost:3001/api/reset_password?email={email}'

            # Enviar correo electrónico con enlace de restablecimiento de contraseña
            s = smtplib.SMTP(os.getenv("SMTP_HOST"), os.getenv("SMTP_PORT"))
            s.starttls()
            s.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASSWORD"))

            message = f"Subject: Restablecimiento de contraseña\n\n"
            message += f"Hola {user.email},\n\n"
            message += "Hemos recibido una solicitud para restablecer tu contraseña. "
            message += f"Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:\n\n{reset_url}\n\n"
            message += "Si no solicitaste un restablecimiento de contraseña, ignora este correo electrónico.\n\n"
            message += "Gracias,\nEl equipo de soporte"

            message = message.encode('utf-8')

            s.sendmail(os.getenv("SMTP_USER"), email, message)
            s.quit()

            success = f'Se ha enviado un correo electrónico a {email} con instrucciones para restablecer la contraseña.'
            return render_template('forgot_password.html', success=success)
        else:
            # Correo electrónico no válido
            error = 'Correo electrónico no válido'
            return render_template('forgot_password.html', error=error)

    else:
        return 'Método no permitido', 405

@api.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    """
    Maneja las solicitudes de restablecimiento de contraseña.

    - Renderiza el formulario de restablecimiento de contraseña en solicitudes GET.
    - Actualiza la contraseña del usuario si el token de restablecimiento de contraseña es válido.
    - Muestra un mensaje de éxito si la contraseña se actualizó correctamente.
    - Muestra un mensaje de error si el token de restablecimiento de contraseña no es válido.
    """

    if request.method == 'GET':
        email = request.args.get('email')
        return render_template('reset_password.html', email=email)

    elif request.method == 'POST':
        # Obtener la nueva contraseña y la confirmación del formulario
        new_password = request.form['new_password']
        confirm_password = request.form['confirm_password']

        # Verificar que las contraseñas coincidan
        if new_password != confirm_password:
            error = 'Las contraseñas no coinciden'
            return render_template('reset_password.html', error=error)

        email = request.form['email']

        # Buscar al usuario por correo electrónico
        user = User.query.filter_by(email=email).first()

        if user:
            # Actualizar la contraseña del usuario
            user.password_hash = new_password # encriptar esto al futuro uwu
            db.session.commit()

            # Mostrar un mensaje de éxito
            success = 'Tu contraseña ha sido actualizada correctamente.'
            return render_template('reset_password.html', success=success)
        else:
            # Correo electrónico no válido
            error = 'Correo electrónico no válido'
            return render_template('reset_password.html', error=error)

    else:
        return 'Método no permitido', 405