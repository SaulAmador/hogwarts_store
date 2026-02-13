from src.app import create_app
from src.models import db, User, Product, Order, OrderItem, CartItem
import os

app = create_app()

with app.app_context():
    try:
        db_uri = app.config.get('SQLALCHEMY_DATABASE_URI', '')
        # Censuramos la contraseña para seguridad
        masked_uri = db_uri.split('@')[-1] if '@' in db_uri else db_uri
        print(f"Conectando a base de datos: ...@{masked_uri}")
        
        print("Iniciando creación forzada de tablas...")
        db.create_all()
        print("¡Tablas creadas/verificadas con éxito! ✨")
    except Exception as e:
        print(f"Error crítico al crear las tablas: {e}")
        exit(1) # Forzamos error para que el despliegue se detenga si esto falla
