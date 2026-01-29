from models import db, User, Product
from app import app

# Usamos el contexto de la aplicación para acceder a la base de datos
with app.app_context():
    # --- Usuarios iniciales ---
    harry = User(
        email="harry@hogwarts.com",
        username="HarryPotter",
        house="Gryffindor",
        password="demo123",
        password_hash="hashed_password_demo"
    )
    hermione = User(
        email="hermione@hogwarts.com",
        username="HermioneGranger",
        house="Gryffindor",
        password="demo123",
        password_hash="hashed_password_demo"
    )
    draco = User(
        email="draco@hogwarts.com",
        username="DracoMalfoy",
        house="Slytherin",
        password="demo123",
        password_hash="hashed_password_demo"
    )

    # --- Productos iniciales ---
    wand = Product(
        name="Varita de Saúco",
        price=999.99,
        description="La varita más poderosa del mundo mágico"
    )
    cloak = Product(
        name="Capa de Invisibilidad",
        price=499.99,
        description="Perfecta para escabullirse por los pasillos de Hogwarts"
    )
    stone = Product(
        name="Piedra de la Resurrección",
        price=299.99,
        description="Un artefacto legendario de las Reliquias de la Muerte"
    )

    # Agregar todo a la sesión
    db.session.add_all([harry, hermione, draco, wand, cloak, stone])
    db.session.commit()

    print("✨ Seed completado: usuarios y productos mágicos insertados ✨")
