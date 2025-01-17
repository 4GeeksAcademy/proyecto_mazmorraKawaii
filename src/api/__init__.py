from flask import Flask
from flask_login import LoginManager # type: ignore
from .models import db, User  # Replace with the correct import

login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.secret_key = 'your_secret_key'  # Replace with a secure secret key
    db.init_app(app)
    
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'  # Replace 'auth.login' with your login endpoint

    with app.app_context():
        from your_blueprint_file import your_blueprint  # Replace with your actual imports
        app.register_blueprint(your_blueprint)

    return app
