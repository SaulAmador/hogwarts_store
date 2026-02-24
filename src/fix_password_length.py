from src.app import create_app
from src.models import db
from sqlalchemy import text

app = create_app()

with app.app_context():
    try:
        db.create_all()
        print("Ampliando columna password_hash a 255 caracteres...")
        # Ejecutamos SQL directo para modificar la columna
        db.session.execute(text('ALTER TABLE "user" ALTER COLUMN password_hash TYPE VARCHAR(255);'))
        db.session.commit()
        print("¡Columna actualizada con éxito! 🪄")
    except Exception as e:
        db.session.rollback()
        print(f"Error al actualizar la base de datos: {e}")
        # Si ya está ampliada, fallará pero no pasa nada
