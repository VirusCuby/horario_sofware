# Gestión de horarios académicos

Aplicación web para registrar docentes, cursos, ciclos y los horarios semanales de una escuela de Informática. Incluye inicio de sesión y control de acceso por roles (`admin` y `docente`).

> Estado: prototipo académico en desarrollo.

## Tecnologías

| Capa | Tecnologías |
|---|---|
| Frontend | React 18 (Create React App), Material UI, React Router, Axios |
| Backend | Node.js, Express 4, Sequelize |
| Base de datos | MySQL (`mysql2`) |
| Seguridad | Contraseñas con bcrypt y sesiones con JWT |

## Qué hace

- Registro e inicio de sesión de usuarios, con contraseñas cifradas.
- Rutas del frontend protegidas por sesión (`PrivateRoute`) y por rol (`RoleRoute`).
- Gestión de docentes, cursos y ciclos.
- Asignación de un docente y un curso a un día y una franja horaria (lunes a viernes), y consulta de los horarios por ciclo.

## Estructura

```
backend/
  config/db.js        Conexión a MySQL con Sequelize
  models/             Usuario, Docente, Curso, Ciclo, Horario
  routes/             auth, usuarios, docentes, cursos, ciclos, horarios
  middleware/         auth.js (valida el token) y authorize.js (valida el rol)
frontend/src/
  components/         Login, Register, Dashboard, Docentes, Cursos, Ciclos, Horarios
  context/            AuthContext.js (estado de la sesión)
```

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior y un servidor MySQL.

1. Crea la base de datos:

   ```sql
   CREATE DATABASE horarios_informatica;
   ```

2. Ajusta la conexión en `backend/config/db.js` (usuario, contraseña y host).

3. Inicia el backend (puerto 5000):

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. Inicia el frontend:

   ```bash
   cd frontend
   npm install
   npm start
   ```

El frontend consume la API en `http://localhost:5000/api` (configurable en `frontend/src/api.js`).

## Pendiente

- Montar todas las rutas en `backend/index.js` (hoy solo se registra la de autenticación).
- Mover el secreto del JWT y las credenciales de la base de datos a variables de entorno.
- Añadir un script para crear las tablas y datos de ejemplo.
- Añadir validación de cruces de horario.

## Autor

Serge López, estudiante de Ingeniería Informática en la Universidad Nacional de Trujillo.
