# ⚡ Hogwarts Store: Proyecto Final Full Stack 🦉

¡Bienvenido a **Hogwarts Store**! Este proyecto es la culminación de mi formación como Desarrollador Full Stack en **4Geeks Academy**. Es una plataforma de comercio electrónico mágica diseñada para que los estudiantes de Hogwarts puedan adquirir sus materiales esenciales: desde túnicas y calderos hasta pociones y hechizos legendarios.

---

## 🚀 Vista Previa
- **Demo en vivo:** [Hogwarts Store en Render](https://hogwarts-store.onrender.com)
- **Frontend:** React + Vite + GSAP
- **Backend:** Python + Flask + PostgreSQL

---

## ✨ Características Principales

### 1. **Identidad Mágica (Autenticación)**
- Sistema de registro e inicio de sesión seguro usando **JWT (JSON Web Tokens)**.
- Perfil dinámico de "Mago/Bruja" que muestra tu casa de Hogwarts y tu **Patronus**.
- **CRUD de Usuario**: Los usuarios pueden actualizar sus datos (Casa, Nombre, Patronus) directamente en su perfil.

### 2. **Integración con el Mundo Mágico (API Externa)**
- Conexión en tiempo real con la **HP-API**.
- Sección dedicada en la Landing Page que muestra personajes destacados con datos reales del universo de Harry Potter.

### 3. **Comercio Mágico (Carrito & Pedidos)**
- Catálogo dinámico filtrado por categorías (Hechizos, Pociones, Objetos).
- Carrito de compras funcional (Agregar/Quitar productos).
- Historial de pedidos persistente vinculado a la cuenta del usuario.

### 4. **Experiencia de Usuario (UI/UX)**
- Interfaz inmersiva con **estética de pergamino y cristal (Glassmorphism)**.
- Animaciones fluidas desarrolladas con **GSAP (GreenSock Animation Platform)** para una sensación "mágica" al navegar.
- Diseño responsivo adaptado para pergaminos (escritorio) y espejos (móviles).

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React.js**: Biblioteca principal para la interfaz.
- **Vite**: Herramienta de construcción ultra rápida.
- **GSAP**: Animaciones y efectos de scroll.
- **React Router**: Gestión de navegación SPA.
- **Axios**: Comunicación con la API REST.

### **Backend**
- **Python & Flask**: Framework de servidor.
- **SQLAlchemy (ORM)**: Gestión de base de datos.
- **Flask-Migrate**: Control de versiones de la base de datos.
- **Flask-JWT-Extended**: Seguridad y autenticación.
- **PostgreSQL**: Base de datos relacional (desplegada en Render).

---

## 💻 Instalación Local

Si deseas correr el Caldero de forma local:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/hogwarts_store.git
   cd hogwarts_store
   ```

2. **Backend Setup:**
   ```bash
   pip install -r requirements.txt
   flask db upgrade
   python src/seed_data.py  # Para cargar productos iniciales
   flask run
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🤝 Autor
Este proyecto fue desarrollado con pasión por **Saúl Amador**, como parte del programa de Full Stack Web Development de **4Geeks Academy**.

---

*Travesura realizada.* ✨