from src.app import create_app
from src.models import db, Product

app = create_app()
with app.app_context():
    Product.query.delete()
    db.session.commit()
    print("Tabla de productos reseteada.")