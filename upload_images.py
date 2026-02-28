import cloudinary
import cloudinary.uploader
import os
import json
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno del archivo .env
load_dotenv()

# Configuración de Cloudinary usando las variables individuales
cloudinary.config(
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
  api_key = os.getenv('CLOUDINARY_API_KEY'),
  api_secret = os.getenv('CLOUDINARY_API_SECRET'),
  secure = True
)

def upload_folder(folder_name, data_file):
    print(f"\n--- 🪄 Procesando {folder_name.upper()} ---")
    local_path = Path(f"frontend/public/{folder_name}")
    
    if not local_path.exists():
        print(f"❌ Error: No se encontró la carpeta {local_path}")
        return

    # Cargar los datos del archivo JSON
    # NOTA: Asegúrate de que la ruta data_file sea correcta (ej: 'data/spells.json')
    try:
        with open(data_file, 'r', encoding='utf-8') as f:
            items = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {data_file}")
        return

    updated_items = False
    for item in items:
        name = item['name']
        # Buscamos coincidencias (minúsculas, con/sin espacios, etc.)
        search_names = [
            name.lower().replace(" ", ""),           # avadakedavra
            name.lower().replace(" ", "_"),          # avada_kedavra
            name.replace(" ", ""),                   # AvadaKedavra
            name.lower().replace(" ", "-"),          # avada-kedavra
        ]
        
        found_file = None
        for s_name in search_names:
            for ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.avif']:
                potential_file = local_path / f"{s_name}{ext}"
                if potential_file.exists():
                    found_file = potential_file
                    break
            if found_file: break
        
        if found_file:
            public_id = name.lower().replace(" ", "_").replace("(", "").replace(")", "")
            print(f"✅ Subiendo {found_file.name} para '{name}'...")
            try:
                upload_result = cloudinary.uploader.upload(
                    str(found_file),
                    folder=f"hogwarts_store/{folder_name}",
                    public_id=public_id,
                    overwrite=True
                )
                item['image_url'] = upload_result['secure_url']
                updated_items = True
                print(f"   ✨ URL: {item['image_url']}")
            except Exception as e:
                print(f"   ⚠️ Error al subir: {e}")
        else:
            print(f"   ⚠️ No se encontró archivo para '{name}' en {local_path}")

    # Guardar el JSON si hubo cambios
    if updated_items:
        with open(data_file, 'w', encoding='utf-8') as f:
            json.dump(items, f, indent=4, ensure_ascii=False)
        print(f"🎉 ¡{data_file} actualizado con éxito!")

if __name__ == "__main__":
    # Las rutas deben apuntar a donde están tus JSON realmente
    upload_folder("hechizos", "data/spells.json")
    upload_folder("pociones", "data/potions.json")
    upload_folder("objetos", "data/objects.json")