📘 Hogwarts Store API

Esta documentación describe los endpoints disponibles en el backend de Hogwarts Store.

🔐 Autenticación

Registro de usuario

POST /register

Body:

{
  "email": "hermione@hogwarts.com",
  "username": "hermione",
  "password": "leviosa123",
  "house": "Gryffindor"
}

Respuesta:

{
  "message": "Registro exitoso",
  "access_token": "<JWT_TOKEN>"
}

Login de usuario

POST /login

Body:

{
  "email": "hermione@hogwarts.com",
  "password": "leviosa123"
}

Respuesta:

{
  "message": "Login exitoso",
  "access_token": "<JWT_TOKEN>"
}

👤 Usuarios

POST /users → Crear usuario

GET /users/<id> → Obtener usuario por ID

🛒 Productos

GET /products → Todos los productos

GET /products/spells → Solo hechizos

GET /products/potions → Solo pociones

GET /products/objects → Solo objetos

POST /products → Crear producto

PUT /products/<id> → Actualizar producto

DELETE /products/<id> → Eliminar producto

🛍️ Carrito

POST /cart → Agregar producto al carrito

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{
  "user_id": 1,
  "product_id": 5,
  "quantity": 2
}

GET /cart/<user_id> → Ver carrito de un usuario

Headers: Authorization: Bearer <JWT_TOKEN>

DELETE /cart/<item_id> → Eliminar producto del carrito

Headers: Authorization: Bearer <JWT_TOKEN>

📦 Órdenes

POST /orders → Crear orden desde el carrito

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{
  "user_id": 1
}

GET /orders/<user_id> → Ver órdenes de un usuario

Headers: Authorization: Bearer <JWT_TOKEN>

⚠️ Notas

Todos los endpoints protegidos requieren el header:

Authorization: Bearer <JWT_TOKEN>

Los tokens expiran en 1 hora.

Para pruebas, usar Postman o similar.

🎯 Flujo completo de prueba

POST /register → Crear usuario y obtener token.

POST /login → Obtener token de acceso.

GET /products → Listar productos.

POST /cart → Agregar producto al carrito.

GET /cart/<user_id> → Ver carrito.

POST /orders → Crear orden.

GET /orders/<user_id> → Ver órdenes del usuario.