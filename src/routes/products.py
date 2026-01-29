from flask import Blueprint, jsonify, request
from src.models import db, Product

products_bp = Blueprint("products_bp", __name__)

#-------------------- Rutas generales ------------------

# READ: obtener todos los productos 
@products_bp.route("/", methods=["GET"])
def get_products(): 
    products = Product.query.all() 
    return jsonify([p.serialize() for p in products]), 200

# READ: obtener un producto por id
@products_bp.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.serialize()), 200

#------------- Rutas especificas por tipo -------------

# READ: obtener hechizos por tipo
@products_bp.route("/spells", methods=["GET"])
def get_spells():
    spells = Product.query.filter_by(type="spell").all()
    return jsonify([s.serialize() for s in spells]), 200

# READ: obtener pociones por tipo
@products_bp.route("/potions", methods=["GET"])
def get_potions():
    potions = Product.query.filter_by(type="potion").all()
    return jsonify([p.serialize() for p in potions]), 200

# READ: obtener objetos por tipo
@products_bp.route("/objects", methods=["GET"])
def get_objects():
    objects = Product.query.filter_by(type="object").all()
    return jsonify([o.serialize() for o in objects]), 200

# ---- CRUD basico (crear, actualizar, eliminar) ----

# CREATE: agregar un producto nuevo
@products_bp.route("/products", methods=["POST"]) 
def create_product(): 
    data = request.get_json()

    # Validaciones
    if not data.get("name") or not data.get("price"):
        return jsonify({"error": "Nombre y precio son obligatorios"}), 400 

    if not data["name"].strip():
        return jsonify({"error": "El nombre no puede estar vacío"}), 400    

    # Validar que no existe el producto 
    existing = Product.query.filter_by(name=data["name"].strip()).first()
    if existing:
        return jsonify({"error": "Ya existe un producto con ese nombre"}), 400

    # Validar precio
    try: 
        price = float(data["price"])
        if price <= 0:
            return jsonify({"error": "El precio debe ser mayor a 0"}), 400
    except ValueError:
        return jsonify({"error": "El precio debe ser un número válido"}), 400

    try: 
        new_product = Product( 
            name=data["name"].strip(),
            price=price, 
            description=data.get("description"),
            category=data.get("category", "Otros"),
            house_affinity=data.get("house_affinity", "Todos"),
            type=data.get("type", "Otros"),
        ) 
        db.session.add(new_product) 
        db.session.commit() 
        return jsonify({
            "message": "Producto creado", 
            "product": new_product.serialize()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# UPDATE: modificar un producto 
@products_bp.route("/products/<int:product_id>", methods=["PUT"]) 
def update_product(product_id):   
    product = Product.query.get_or_404(product_id) 
    data = request.get_json()

    # Validar precio si viene en el request
    if "price" in data:
        try:
            price = float(data["price"])
            if price <= 0:
                return jsonify({"error": "El precio debe ser mayor a 0"}), 400
            product.price = price
        except ValueError:
            return jsonify({"error": "El precio debe ser un número válido"}), 400 

    # Validar nombre si viene en el request 
    if "name" in data:
        if not data["name"].strip():
            return jsonify({"error": "El nombre no puede estar vacío"}), 400
        # Verificar que no existe otro producto con el mismo nombre 
        if data["name"].strip() != product.name:
            existing = Product.query.filter_by(name=data["name"].strip()).first()
            if existing:
                return jsonify({"error": "Ya existe un producto con ese nombre"}), 400
        product.name = data["name"].strip()
    
    # Actualizar otros campos
    if "description" in data:
        product.description = data["description"]
    if "category" in data:
        product.category = data["category"]
    if "house_affinity" in data:
        product.house_affinity = data["house_affinity"]

    try: 
        db.session.commit() 
        return jsonify({
            "message": "Producto actualizado", 
            "product": product.serialize()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# DELETE: eliminar un producto 
@products_bp.route("/products/<int:product_id>", methods=["DELETE"]) 
def delete_product(product_id): 
    product = Product.query.get_or_404(product_id) 
    try: 
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Producto eliminado"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
