from flask import Blueprint, jsonify, request
from src.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

users_bp = Blueprint("users_bp", __name__)

# READ: obtener todos los usuarios
@users_bp.route("/users", methods=["GET"]) 
def get_users(): 
    users = User.query.all() 
    users_list = [
        {
            "id": u.id, 
            "email": u.email, 
            "username": u.username, 
            "house": u.house, 
            "created_at": u.created_at.isoformat() if u.created_at else None 
        } for u in users 
    ] 
    return jsonify(users_list), 200

# READ: obtener un usuario por id
@users_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "house": user.house,
        "created_at": user.created_at.isoformat() if user.created_at else None
    }), 200

# CREATE: agregar un nuevo usuario 
@users_bp.route("/users", methods=["POST"]) 
def create_user(): 
    data = request.get_json() 

    # Validación de campos requeridos  
    if not data.get("email") or not data.get("username") or not data.get("password"):
        return jsonify({"error": "Email, username y password son obligatorios"}), 400
    # Validación de campos vacíos
    if not data["email"].strip() or not data["username"].strip():
        return jsonify({"error": "Email y username no pueden estar vacíos"}), 400
    # Validacion de email duplicado
    if User.query.filter_by(email=data["email"].strip()).first():
        return jsonify({"error": "Email ya registrado"}), 400
    #Validacion de username duplicado
    if User.query.filter_by(username=data["username"].strip()).first():
        return jsonify({"error": "El usarname ya existe"}), 400

    try:
        hashed_pw = generate_password_hash(data["password"]) 
        new_user = User( 
            email=data["email"].strip(), 
            username=data["username"].strip(), 
            house=data.get("house"), 
            password_hash=hashed_pw 
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "message": "Usuario creado", 
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "username": new_user.username,
                "house": new_user.house,
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# UPDATE: modificar un usuario existente 
@users_bp.route("/users/<int:user_id>", methods=["PUT"]) 
def update_user(user_id): 
    user = User.query.get_or_404(user_id) 
    data = request.get_json() 
    user.email = data.get("email", user.email) 
    user.username = data.get("username", user.username) 
    user.house = data.get("house", user.house) 

    try:
        db.session.commit() 
        return jsonify({"message": "Usuario actualizado"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# DELETE: eliminar un usuario 
@users_bp.route("/users/<int:user_id>", methods=["DELETE"]) 
def delete_user(user_id): 
    user = User.query.get_or_404(user_id) 

    try: 
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuario eliminado"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500