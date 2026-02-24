import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta

from src.models import db, Product, Order, OrderItem, CartItem, User
from src.utils import APIException, generate_sitemap
from src.routes.users import users_bp
from src.routes.products import products_bp
from src.routes.cart import cart_bp
from src.routes.orders import orders_bp
from src.routes.auth import auth_bp

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    
    # Configuraciones de la base de datos 
    db_url = os.getenv("DATABASE_URL")
    if db_url is not None and db_url.strip() != "":
        app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
    else:
        basedir = os.path.abspath(os.path.dirname(__file__))
        # Go up one level from src/ to root, then into instance/
        root_dir = os.path.dirname(basedir)
        db_path = os.path.join(root_dir, 'instance', 'hogwarts_store.db')
        app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "hogwarts_secret")
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "hogwarts_secret")
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    
    # Inicializacion de extensiones
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)    
    CORS(app)
    
    # Registro de blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(products_bp, url_prefix='/products')
    app.register_blueprint(cart_bp, url_prefix='/cart')
    app.register_blueprint(orders_bp, url_prefix='/orders')

    # Manejo de errores
    @app.errorhandler(APIException)
    def handle_invalid_usage(error):
        return jsonify(error.to_dict()), error.status_code

    # Ruta basicas de la app
    @app.route('/')
    def sitemap():
        return generate_sitemap(app)
    
    @app.route('/hello', methods=['GET'])
    def handle_hello():
        return jsonify({"message": "Lumos Maxima! Backend is running."}), 200
    
    return app


# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app = create_app()
    app.run(host='0.0.0.0', port=PORT, debug=True)
