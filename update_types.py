from src.app import create_app
from src.models import db, Product

app = create_app()

with app.app_context():
    for product in Product.query.all():
        if product.type == "other":
            cat = (product.category or "").lower()
            name = product.name.lower()

            if "pocion" in cat or "pociones"in cat:
                product.type = "potion"
            elif "hechizo" in cat or "encantamiento" in cat or "curse" in name or "charm" in name:
                product.type = "spell"
            else:
                product.type = "object"

    db.session.commit()
    print("Tipos actualizados correctamente.")