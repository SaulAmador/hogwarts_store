# Ejecuta este script dentro del contexto de tu app Flask (app_context) si usas SQLAlchemy 
# Ej: from app import create_app; app = create_app(); with app.app_context(): main()
import os
import random
import json
from pathlib import Path
from src.models import db, Product
from src.app import create_app
from services.hp_importer import fetch_spells, fetch_potions

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

        
# Genera un precio magico basado en el nombre y efecto del hechizo 
def price_from_spell(spell_name: str, effect: str) -> float:
    # Reglas simples: base por longuitud + rareza por palabras clave
    base = 10 + len(spell_name) * 3
    keywords = [
        "unforgivable",
        "dark",
        "curse",
        "protego",
        "expelliarmus"
    ]
    bump = 0
    text = f"{spell_name}{effect}".lower()
    for k in keywords:
        if k in text:
            bump += 25
    
    # Variacion ligera para no tener precios identicos 
    noise = random.randint(0, 15)
    return round(base + bump + noise, 2)

# Inserta un hechizo como producto con categorias, narrrativa y afinidad
def upsert_product_from_spell(spell):
    # Inserta un hechizo como producto, evitando duplicados por nombre
    name = spell.get("name", "").strip()
    effect = spell.get("description", "") or spell.get("effect", "")
    if not name:
        return False

    # Evitar duplicados por nombre
    existing = Product.query.filter_by(name=name).first()
    if existing:
        return False
    
    # Clasificacion magica
    desc_lower = effect.lower()
    if "light" in desc_lower or "levitate" in desc_lower:
        category = "Encantamiento básico"
        house_affinity = "Ravenclaw"
    elif "defend" in desc_lower or "disarm" in desc_lower:
        category = "Defensa contra las artes oscuras"
        house_affinity = "Gryffindor"
    elif "heal" in desc_lower or "protect" in desc_lower or "repair" in desc_lower:
        category = "Curación y protección"
        house_affinity = "Hufflepuff"
    elif "dark" in desc_lower or "curse" in desc_lower:
        category = "Hechizo oscuro"
        house_affinity = "Slytherin"
    else:
        category = "Otros"
        house_affinity = "Todos"
    
    # Narrativa descriptiva
    narrative = f"{effect} - usado comunmente por estudiantes de {house_affinity}."

    # Precio magico
    price = price_from_spell(name, effect)

    product = Product(
        name=name,
        price=price,
        description=narrative,
        category=category,
        house_affinity=house_affinity,
        type="spell"
    )
    db.session.add(product)
    return True

def upsert_product_from_potion(potion):
    name = (potion.get("name") or "").strip()
    effect = (potion.get("description") or potion.get("effect") or "").strip()
    if not name:
        return False
    
    # Evitar duplicados por nombre
    existing = Product.query.filter_by(name=name).first()
    if existing:
        return False
    
    # Clasificacion magica
    desc_lower = effect.lower()
    if "love" in desc_lower or "amortentia" in desc_lower or "obesession" in desc_lower:
        category = "Pociones de amor"
        house_affinity = "Ravenclaw"
    elif "heal" in desc_lower or "cure" in desc_lower or "calms" in desc_lower or "soothes" in desc_lower:
        category = "Pociones de curación"
        house_affinity = "Hufflepuff"
    elif "strength" in desc_lower or "power" in desc_lower or "luck" in desc_lower:
        category = "Pociones de poder"
        house_affinity = "Gryffindor"
    elif "poison" in desc_lower or "death" in desc_lower or "dark" in desc_lower:
        category = "Pociones oscuras"
        house_affinity = "Slytherin"
    else:
        category = "Otros"
        house_affinity = "Todos"
    
    # Narrativa descriptiva
    narrative = f"{effect} - preparada comunmente por estudiantes de {house_affinity}."

    # Precio magico
    price = price_from_spell(name, effect)

    product = Product(
        name=name,
        price=price,
        description=narrative,
        category=category,
        house_affinity=house_affinity,
        type="potion"
    )
    db.session.add(product)
    return True

def upsert_product_from_object(object):
    name = (object.get("name") or "").strip()
    description = object.get("description", "")
    category = object.get("category", "Otros")
    house_affinity = object.get("house_affinity", "Todos")
    price = object.get("price", 100.0)

    if not name:
        return False
    
    existing = Product.query.filter_by(name=name).first()
    if existing:
        return False
    
    product = Product(
        name=name,
        price=price,
        description=description,
        category=category,
        house_affinity=house_affinity,
        type="object"
    )
    db.session.add(product)
    return True
    
def main():
    print(f"Base de datos: {db.engine.url}")
    print(f"Directorio base: {BASE_DIR}")
    print(f"Directorio data: {DATA_DIR}")
    print(f"Archivos en data: {list(DATA_DIR.glob('*.json')) if DATA_DIR.exists() else 'DIRECTORIO NO EXISTE'}")
    
    # Hechizos
    spells = fetch_spells()
    print(f"Hechizos obtenidos: {len(spells)}")
    total_spells = len(spells)
    created_spells = 0
    for spell in spells:
        if upsert_product_from_spell(spell):
            created_spells += 1
    print(f"Hechizos creados: {created_spells}/{total_spells}")

    # Pociones (JSON local)
    potions = fetch_potions()
    total_potions = len(potions)
    created_potions = 0
    for potion in potions:
        if upsert_product_from_potion(potion):
            created_potions += 1
    print(f"Pociones creadas: {created_potions}/{total_potions}")

    # Objetos (JSON local)
    objects_path = DATA_DIR / "objects.json"
    with objects_path.open("r", encoding="utf-8") as f:
        objects = json.load(f)
    total_objects = len(objects)
    created_objects = 0
    for obj in objects:
        if upsert_product_from_object(obj):
            created_objects += 1
    print(f"Objetos creados: {created_objects}/{total_objects}")
    
    try:
        db.session.commit()
        print("Productos creados exitosamente")
    except Exception as e:
        db.session.rollback()
        print(f"Error al crear productos: {e}")
        raise

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
        main()