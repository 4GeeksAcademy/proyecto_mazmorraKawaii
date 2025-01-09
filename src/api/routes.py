from flask import request, jsonify, Blueprint
from api.models import db, User, Juego, Carrito, DetalleOrden, OrdenCompra, Contacto, Administrador
from api.utils import APIException
from flask_cors import CORS
from datetime import datetime
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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

@api.route('/juegos/buscar', methods=['GET']) 
def search_juego():
    titulo = request.args.get('titulo')
    juegos = Juego.query.filter(Juego.titulo.ilike(f"%{titulo}%")).all()
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

# Carrito routes
@api.route('/carrito', methods=['GET']) #500
def view_carrito():
    carrito = Carrito.query.all()
    carrito_list = []
    for item in carrito:
        juego = Juego.query.get(item.juego_id) #relacion de fk
        datos_item = {
                'carrito_id': item.id,
                #'session_id': item.session_id,
                'juego': {
                'id': juego.id,
                'titulo': juego.titulo,
                'descripcion': juego.descripcion,
                'precio': juego.precio,
                'tiempo_juego': juego.tiempo_juego,
                'modalidad': juego.modalidad,
                'categoria': juego.categoria,
                'imagen_url': juego.imagen_url,
                'existencias': juego.existencias
            },
            'cantidad': item.cantidad
        }
        carrito_list.append(datos_item)
    return jsonify(carrito_list), 200  



    item = Carrito.query.get(item_id)
    if not item:
        raise APIException('Item not found', status_code=404)
    data = request.json
    for key, value in data.items():
        setattr(item, key, value)
    db.session.commit()
    return jsonify(item.serialize()), 200

@api.route('/orden', methods=['POST'])
def create_orden():
    data = request.json

    fecha_compra = datetime.strptime(data['fecha_compra'], "%Y-%m-%d")

    nueva_orden = OrdenCompra(
        fecha_compra=fecha_compra,
        total=data['total'],
        estado=data['estado'],
        nombre_cliente=data['nombre_cliente'],
        direccion_cliente=data['direccion_cliente'],
        region_cliente=data['region_cliente'],
        comuna_cliente=data['comuna_cliente'],
        telefono_cliente=data['telefono_cliente'],
        email_cliente=data['email_cliente']
    )
    db.session.add(nueva_orden)
    db.session.flush()

    identificador = uuid.uuid4()

    for item in data['juegos']:
        juego = Juego.query.get(item['id'])
        if not juego:
            raise APIException(f"Juego with ID '{item['id']}' not found", status_code=404)

        detalle = DetalleOrden(
            orden_id=nueva_orden.id,
            juego_id=juego.id,
            cantidad=item['cantidad']
        )
        db.session.add(detalle)

        # # carrito_item = Carrito.query.filter_by(juego_id=juego.id).first()
        # if carrito_item:
        #     carrito_item.cantidad += item['cantidad']
        # else:
        carrito_item = Carrito(
            identificador=identificador,
            juego_id=juego.id,
            cantidad=item['cantidad']
        )
        db.session.add(carrito_item)

    db.session.commit()

    return jsonify(nueva_orden.serialize()), 201
####### aqui quedamos
@api.route('/ordenes', methods=['GET'])
def view_ordenes():
    ordenes = OrdenCompra.query.all()
    return jsonify([orden.serialize() for orden in ordenes]), 200

@api.route('/orden/<int:orden_id>', methods=['GET'])
def get_orden_detail(orden_id):
    orden = OrdenCompra.query.get(orden_id)
    if not orden:
        raise APIException('Orden not found', status_code=404)
    return jsonify(orden.serialize()), 200

@api.route('/orden/<int:orden_id>', methods=['PUT'])
def update_orden_estado(orden_id):
    orden = OrdenCompra.query.get(orden_id)
    if not orden:
        raise APIException('Orden not found', status_code=404)
    data = request.json
    orden.estado = data.get('estado', orden.estado)
    db.session.commit()
    return jsonify(orden.serialize()), 200


# Administrador login: 
@api.route('/register', methods=['POST'])
def register():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(
        email=data['email'],
        is_active=True
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id) # genera token JWT
        return jsonify({"message": "Login successful", "access_token": access_token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@api.route('/reset_password', methods=['POST'])
def reset_password():
    # logica de restablecer contrase;a con email.js
    pass

#admi crud:
@api.route('/admin/juego', methods=['POST']) 
@jwt_required() 
def create_juego():
 current_user = get_jwt_identity()
 # Solo permitir si es administrador
 # (Aquí verificarías si current_user tiene permisos de administrador)
 data = request.json
 nuevo_juego = Juego(**data)
 db.session.add(nuevo_juego)
 db.session.commit()
 return jsonify(nuevo_juego.serialize()), 201 
# Otros endpoints CRUD protegidos por @jwt_required()


# Contacto (es la page con el form para clientes)
@api.route('/contacto', methods=['POST'])
def send_message():
    data = request.json
    try:
        nuevo_contacto = Contacto(
            nombre=data['nombre'],
            email=data['email'],
            telefono=data['telefono'],
            mensaje=data['mensaje'],
            fecha_envio=datetime.utcnow(),
            leido=False
        )
        db.session.add(nuevo_contacto)
        db.session.commit()
        return jsonify(nuevo_contacto.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api.route('/contactos', methods=['GET'])
def view_messages():
    try:
        mensajes = Contacto.query.all()
        return jsonify([mensaje.serialize() for mensaje in mensajes]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api.route('/contacto/<int:contacto_id>', methods=['PUT'])
def mark_as_read(contacto_id):
    try:
        contacto = Contacto.query.get(contacto_id)
        if not contacto:
            return jsonify({"error": "Contacto not found"}), 404
        contacto.leido = True
        db.session.commit()
        return jsonify(contacto.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400