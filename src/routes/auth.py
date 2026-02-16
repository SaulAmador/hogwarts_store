from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from src.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from datetime import timedelta

# Crea un Blueprint llamado "auth_bp" para agrupar rutas de autenticación
auth_bp = Blueprint("auth_bp", __name__, url_prefix='/auth')

# Define la ruta de registro que acepta solo peticiones POST
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    if not data.get("email") or not data.get("username") or not data.get("password"):
        return jsonify({"error": "Email, username y password son obligatorios"}), 400
    
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "El email ya existe"}), 400
    
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "El username ya existe"}), 400
    
    try:
        hashed = generate_password_hash(data["password"])
        # Log para depuración
        print(f"Intentando registrar usuario: {data.get('username')} con casa: {data.get('house')}")
        
        user = User(
            email=data["email"],
            username=data["username"],
            house=data.get("house", "sin_casa"),
            patronus=data.get("patronus", "sin patronus"),
            password_hash=hashed
        )
        db.session.add(user)
        db.session.commit()
        print(f"Usuario {user.username} registrado exitosamente")
        
        access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=1))
        return jsonify({"message": "Registro exitoso", "access_token": access_token}), 201
    except Exception as e:
        db.session.rollback()
        print(f"ERROR CRITICO EN REGISTRO: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Error interno en el servidor: {str(e)}"}), 500

# Define la ruta de login que acepta solo peticiones POST
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email y password son obligatorios"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"error": "Email o password incorrectos"}), 401

    access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=1))
    refresh_token = create_refresh_token(identity=str(user.id))
    return jsonify({
        "message": "Login exitoso", 
        "access_token": access_token, 
        "refresh_token": refresh_token
    }), 200    

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    new_token = create_access_token(identity=identity, expires_delta=timedelta(hours=1))
    return jsonify(access_token=new_token), 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required() 
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200