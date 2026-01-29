from flask import Blueprint, jsonify, request
from src.models import db, Order, OrderItem, User, CartItem, Product
from flask_jwt_extended import jwt_required, get_jwt_identity

orders_bp = Blueprint("orders_bp", __name__)

@orders_bp.route("/orders/<int:user_id>", methods=["GET"])
@jwt_required()
def get_orders(user_id):
    user_id = int(get_jwt_identity())
    orders = Order.query.filter_by(user_id=user_id).all()
    orders_list = []
    for o in orders:
        orders_list.append({
            "id": o.id,
            "created_at": o.created_at.isoformat() if o.created_at else None,
            "total": o.total,
            "items": [{
                "product": item.product.name,
                "quantity": item.quantity,
                "price": item.unit_price
            }
            for item in o.items
            ]
        })
    return jsonify(orders_list), 200

@orders_bp.route("/orders", methods=["POST"])
@jwt_required()
def create_order():
    user_id = int(get_jwt_identity())
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"error": "El carrito está vacío"}), 400

    try:
        new_order = Order(user_id=user_id)
        db.session.add(new_order)
        db.session.flush()

        total = 0.0
        for item in cart_items:
            order_item = OrderItem(
                order_id=new_order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.product.price
            )
            db.session.add(order_item)
            total += item.quantity * item.product.price
        
        new_order.total = total 

        for item in cart_items:
            db.session.delete(item)
        
        db.session.commit()
        return jsonify({"message": "Orden creada", "order_id": new_order.id, "total": total}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@orders_bp.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    try:
        db.session.delete(order)
        db.session.commit()
        return jsonify({"message": "Orden eliminada"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


