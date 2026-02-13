from src.app import create_app
from src.models import db

app = create_app()

with app.app_context():
    try:
        print("Iniciando creación forzada de tablas...")
        db.create_all()
        print("¡Tablas creadas/verificadas con éxito! ✨")
    except Exception as e:
        print(f"Error al crear las tablas: {e}")
