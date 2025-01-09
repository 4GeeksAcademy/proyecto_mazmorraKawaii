  
import os
from flask_admin import Admin
from .models import db, User, Juego, Carrito, DetalleOrden, OrdenCompra, Contacto, Administrador
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='ADMI - mazmorra Kawaii ', template_mode='bootstrap3')
    
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Juego, db.session))
    admin.add_view(ModelView(Carrito, db.session))
    admin.add_view(ModelView(DetalleOrden, db.session))
    admin.add_view(ModelView(OrdenCompra, db.session))
    admin.add_view(ModelView(Contacto, db.session))
    admin.add_view(ModelView(Administrador, db.session))