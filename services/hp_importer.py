import requests
import json
from pathlib import Path

HP_API_BASE = "https://hp-api.onrender.com/api"
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

def fetch_spells():
    spells_path = DATA_DIR / "spells.json"
    if not spells_path.exists():
        print(f"Archivo no encontrado: {spells_path}")
        return []
    try: 
        with spells_path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error al obtener hechizos: {e}")
        return []

def fetch_characters():
    url = f"{HP_API_BASE}/characters"
    response = requests.get(url, timeout=30)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error al obtener personajes: {response.status_code}")
        return []

def fetch_character_by_house(house: str):
    url = f"{HP_API_BASE}/characters/house/{house}"
    response = requests.get(url, timeout=20)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error al obtener personajes por casa: {response.status_code}")
        return []

def fetch_potions():
    potions_path = DATA_DIR / "potions.json"
    if not potions_path.exists():
        print(f"Archivo no encontrado: {potions_path}")
        return []
    try: 
        with potions_path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error al obtener pociones: {e}")
        return []