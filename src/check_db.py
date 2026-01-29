from src.app import create_app
from src.models import db
from sqlalchemy import inspect

app = create_app()

with app.app_context():
    # Lista todas las tablas que SQLAlchemy ve en la base
    inspector = inspect(db.engine)
    print("Tablas en la base de datos:")
    print(inspector.get_table_names())
