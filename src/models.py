from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Inicialización de SQLAlchemy para manejar la base de datos
db = SQLAlchemy()

# ------------------- Modelo de Usuario -------------------
class User(db.Model):
    # Definición de la tabla de usuarios
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    house = db.Column(db.String(50), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Métodos para manejar la contraseña
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

    # Método para serializar el objeto
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "house": self.house,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            # do not serialize the password, its a security breach
        }

# ------------------- Modelo de Producto -------------------
class Product(db.Model):
    # Definición de la tabla de productos
    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=True)
    house_affinity = db.Column(db.String(50))    
    image_url = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean, default=True)

    # tipo de producto (hechizo, pocion, objeto)
    type = db.Column(db.String(20), nullable=True)

    def serialize(self):
        return {
            "id": self.id, 
            "name": self.name, 
            "price": self.price,
            "description": self.description, 
            "category": self.category,
            "house_affinity": self.house_affinity,
            "image_url": self.image_url, 
            "is_active": self.is_active,
            "type": self.type
        }

# ------------------- Modelo de Orden -------------------
class Order(db.Model):
    # Definición de la tabla de ordenes
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    total = db.Column(db.Float, default=0.0)

    # Relaciones
    user = db.relationship("User", backref="orders")
    items = db.relationship("OrderItem", backref="order", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id, 
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),
            "total": self.total,
        }

class OrderItem(db.Model):
    # Definición de la tabla de items de orden
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    unit_price = db.Column(db.Float, nullable=False)
    
    product = db.relationship("Product")

    def serialize(self):
        return {
            "id": self.id, "order_id": self.order_id,
            "product": self.product.serialize(), "quantity": self.quantity,
            "price": self.unit_price,
            "type": self.product.type
        }

class CartItem(db.Model):
    # Definición de la tabla de items del carrito
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    
    user = db.relationship("User", backref="cart_items")
    product = db.relationship("Product")

    def serialize(self):
        return {
            "id": self.id, "user_id": self.user_id,
            "product": self.product.serialize(), "quantity": self.quantity,
            "type": self.product.type
        }