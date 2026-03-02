# ⚡ Hogwarts Store: Proyecto Final Full Stack 🦉

¡Bienvenido a **Hogwarts Store**! Este proyecto es la culminación de mi formación como Desarrollador Full Stack en **4Geeks Academy**. Es una plataforma de comercio electrónico mágica diseñada para que los estudiantes de Hogwarts puedan adquirir sus materiales esenciales: desde túnicas y calderos hasta pociones y hechizos legendarios.

---

## 🚀 Vista Previa
- **Demo en vivo:** [Hogwarts Store en Render](https://hogwarts-store.onrender.com)
- **Frontend:** React + Vite + GSAP
- **Backend:** Python + Flask + PostgreSQL

---

---

## ✨ Características Principales

### 1. **Identidad Mágica (Autenticación)**
- Sistema de registro e inicio de sesión seguro usando **JWT (JSON Web Tokens)**.
- Perfil dinámico de "Mago/Bruja" que muestra tu casa de Hogwarts y tu **Patronus**.
- **CRUD de Usuario**: Los usuarios pueden actualizar sus datos (Casa, Nombre, Patronus) directamente en su perfil.

### 2. **Integración con el Mundo Mágico (API Externa)**
- Conexión en tiempo real con la **HP-API**.
- Sección dedicada en la Landing Page que muestra personajes destacados con datos reales del universo de Harry Potter.

### 3. **Gestión de Imágenes (Cloudinary)**
- **Cloudinary Integration**: Todas las imágenes de productos (hechizos, pociones, objetos) se sirven desde la nube para mayor rendimiento.
- **Transformación Dinámica**: Ajuste automático del tamaño de las imágenes para que encajen perfectamente en los componentes del frontend.

### 4. **Comercio Mágico (Carrito & Pedidos)**
- Catálogo dinámico filtrado por categorías (Hechizos, Pociones, Objetos).
- Carrito de compras funcional (Agregar/Quitar productos).
- Historial de pedidos persistente vinculado a la cuenta del usuario.

### 5. **Experiencia de Usuario (UI/UX)**
- Interfaz inmersiva con **estética de pergamino y cristal (Glassmorphism)**.
- Animaciones fluidas desarrolladas con **GSAP (GreenSock Animation Platform)** para una sensación "mágica" al navegar.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React.js / Vite**: Biblioteca principal y herramienta de construcción.
- **GSAP**: Animaciones y efectos de scroll.
- **Axios**: Comunicación con la API REST.

### **Backend**
- **Python & Flask**: Framework de servidor.
- **SQLAlchemy (ORM) & PostgreSQL**: Gestión y persistencia de datos.
- **Cloudinary**: Hosting y optimización de imágenes.
- **Flask-JWT-Extended**: Seguridad y autenticación.

---

## 💻 Instalación Local

### 1. **Requisitos Previos**
- Python 3.10+
- Node.js & npm
- Cuenta de [Cloudinary](https://cloudinary.com/) (opcional si usas los JSON actuales).

### 2. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/hogwarts_store.git
cd hogwarts_store
```

### 3. **Backend Setup:**
1. Crea tu entorno virtual: `source venv/bin/activate`
2. Instala dependencias: `pip install -r requirements.txt`
3. Configura el archivo `.env` en la raíz:
   ```env
   DATABASE_URL=sqlite:///instance/hogwarts_store.db
   FLASK_APP=src/app.py
   JWT_SECRET_KEY=tu_secreto_magico
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   ```
4. Inicializa la base de datos:
   ```bash
   python src/seed_hp_products.py
   ```

### 4. **Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🪄 Scripts Especiales

- `upload_images.py`: Script de utilidad para subir imágenes locales de `public/` a Cloudinary y actualizar los archivos JSON automáticamente.
- `src/seed_hp_products.py`: Seeder inteligente que sincroniza los productos entre los archivos JSON y la base de datos, incluyendo metadatos de Cloudinary.

---

## 🤝 Autor
Este proyecto fue desarrollado con pasión por **Saúl Amador**, como parte del programa de Full Stack Web Development de **4Geeks Academy**.

---

*Travesura realizada.* ✨