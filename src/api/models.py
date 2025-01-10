from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password) 

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
        }

class Juego(db.Model):
    __tablename__ = "Juego"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    titulo = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    tiempo_juego = db.Column(Enum('corto', 'largo', name='tiempo_juego_enum', create_type=False))
    modalidad = db.Column(Enum('colaborativo', 'competitivo', name='modalidad', create_type=False))
    categoria = db.Column(Enum('juego_de_mesa', 'rol', 'tcg', name='categoria_juego_enum', create_type=False))
    imagen_url = db.Column(db.String(255))
    existencias = db.Column(db.Integer, default=0, nullable=False)
    detalles_orden = db.relationship('DetalleOrden', back_populates='juego', cascade='all, delete')

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "tiempo_juego": self.tiempo_juego,
            "modalidad": self.modalidad,
            "categoria": self.categoria,
            "imagen_url": self.imagen_url,
            "existencias": self.existencias
        }

class Carrito(db.Model):
    __tablename__ = "Carrito"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    identificador = db.Column(db.String(255), nullable=False)
    juego_id = db.Column(db.Integer, db.ForeignKey('Juego.id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "identificador": self.identificador,
            "juego_id": self.juego_id,
            "cantidad": self.cantidad
        }

class DetalleOrden(db.Model):
    __tablename__ = "DetalleOrden"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    orden_id = db.Column(db.Integer, db.ForeignKey('OrdenCompra.id'), nullable=False)
    juego_id = db.Column(db.Integer, db.ForeignKey('Juego.id'), nullable=False)
    cantidad = db.Column(db.Integer)
    orden = db.relationship('OrdenCompra', back_populates='detalles', cascade='all, delete')
    juego = db.relationship('Juego', back_populates='detalles_orden', cascade='all, delete')

    def serialize(self):
        return {
            "id": self.id,
            "orden_id": self.orden_id,
            "juego_id": self.juego_id,
            "cantidad": self.cantidad,
            "juego_titulo": self.juego.titulo
        }

class OrdenCompra(db.Model):
    __tablename__ = "OrdenCompra"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    fecha_compra = db.Column(db.DateTime)
    total = db.Column(db.Float)
    estado = db.Column(Enum('pendiente', 'pagado', name='estado_enum', create_type=False))  
    nombre_cliente = db.Column(db.String(255), nullable=False)
    direccion_cliente = db.Column(db.String(255), nullable=False)
    comuna_cliente = db.Column(db.String(255), nullable=False)
    region_cliente = db.Column(db.String(255), nullable=False)
    telefono_cliente = db.Column(db.String(9), nullable=False)
    email_cliente = db.Column(db.String(255), nullable=False)
    comprobanteImg_url = db.Column(db.String(255), nullable=True) #cambiar a flase una vez sepa de cloudinary
    detalles = db.relationship('DetalleOrden', back_populates='orden', cascade='all, delete')

    def serialize(self):
        return {
            "id": self.id,
            "fecha_compra": self.fecha_compra.strftime("%Y-%m-%d %H:%M:%S") if self.fecha_compra else None,
            "total": self.total,
            "estado": self.estado,
            "nombre_cliente": self.nombre_cliente,
            "direccion_cliente": self.direccion_cliente,
            "comuna_cliente": self.comuna_cliente,
            "region_cliente": self.region_cliente,
            "telefono_cliente": self.telefono_cliente,
            "email_cliente": self.email_cliente,
            "detalles": [detalle.serialize() for detalle in self.detalles],
            "comprobanteImg_url" : self.comprobanteImg_url
        }

class Contacto(db.Model): 
    __tablename__ = "Contacto"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    telefono = db.Column(db.String(9), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    fecha_envio = db.Column(db.DateTime, nullable=False)
    leido = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "telefono": self.telefono,
            "mensaje": self.mensaje,
            "fecha_envio": self.fecha_envio.strftime("%Y-%m-%d %H:%M:%S") if self.fecha_envio else None,
            "leido": self.leido
        }

class Administrador(db.Model):
    __tablename__ = "Administrador"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email
        }
