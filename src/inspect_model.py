from src.models import User
import inspect

print("--- INSPECCIÓN DEL MODELO USER ---")
attributes = [a for a in dir(User) if not a.startswith('_')]
print(f"Atributos encontrados: {attributes}")
if 'patronus' in attributes:
    print("✅ 'patronus' SÍ existe en el modelo.")
else:
    print("❌ 'patronus' NO existe en el modelo.")
print("----------------------------------")
