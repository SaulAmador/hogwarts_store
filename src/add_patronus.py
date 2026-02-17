from src.app import create_app
from src.models import db
from sqlalchemy import text

app = create_app()
with app.app_context():
    try:
        print("Agregando patronus a los usuarios...")
        db.session.execute(text('ALTER TABLE "user" ADD COLUMN patronus VARCHAR(50);'))
        db.session.commit()
        print("Columna patronus agregada con exito")        
    except Exception as e:
        print(f"Nota: {e} (Probablemente la columna ya existia)")