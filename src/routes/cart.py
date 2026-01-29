from flask import Blueprint, jsonify, request
from src.models import db, CartItem, User, Product
from flask_jwt_extended import jwt_required, get_jwt_identity

cart_bp = Blueprint("cart_bp", __name__)

# Obtener el carrito del usuario
@cart_bp.route("/cart", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = int(get_jwt_identity())
    items = CartItem.query.filter_by(user_id=user_id).all()
    cart_list = [
        {
            "id": item.id,
            "product": item.product.name,
            "price": item.product.price,
            "quantity": item.quantity
        }
        for item in items
    ]
    return jsonify(cart_list), 200

# Añadir producto al carrito
@cart_bp.route("/cart", methods=["POST"])
@jwt_required()
def add_to_cart():
    data = request.get_json()
    user_id = int(get_jwt_identity())

    if not data.get("product_id"):
        return jsonify({"error": "product_id es obligatorio"}), 400
    
    quantity = data.get("quantity", 1)
    if not isinstance(quantity, int) or quantity <= 0:
        return jsonify({"error": "quantity debe ser un número positivo"}), 400
    
    try:
        product = Product.query.get_or_404(data["product_id"])
        existing_item = CartItem.query.filter_by(user_id=user_id, product_id=product.id).first()
        if existing_item:
            existing_item.quantity += quantity
        else:
            new_item = CartItem(
                user_id=user_id, 
                product_id=product.id, 
                quantity=quantity
            )
            db.session.add(new_item)

        db.session.commit() 
        return jsonify({"message": "Producto agregado al carrito"}), 201 
    except Exception as e: 
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500
    
# Eliminar producto del carrito
@cart_bp.route("/cart/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_from_cart(item_id):
    user_id = int(get_jwt_identity())
    item = CartItem.query.get_or_404(item_id)

    if item.user_id != user_id:
        return jsonify({"error": "No tienes permiso para eliminar este producto del carrito"}), 403
        
    try:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Producto eliminado del carrito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Vaciar carrito
@cart_bp.route("/cart", methods=["DELETE"])
@jwt_required()
def clear_cart():
    user_id = int(get_jwt_identity())
    items = CartItem.query.filter_by(user_id=user_id).all()
    try:
        for item in items:
            db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Carrito vaciado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500