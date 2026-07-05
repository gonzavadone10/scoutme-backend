# ScoutMe - Backend

## Descripción

Backend desarrollado con Node.js y Express para la plataforma ScoutMe.

Provee la API REST utilizada por la aplicación web para gestionar usuarios, perfiles deportivos, estadísticas y autenticación.

---

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- CORS
- bcrypt
- JWT (estructura preparada)

---

## Funcionalidades

- Registro de usuarios
- Inicio de sesión
- Gestión de perfiles deportivos
- CRUD de estadísticas
- Consulta de jugadores
- Panel administrativo
- Comunicación con base de datos MySQL

---

## Instalación

Clonar el repositorio

```bash
git clone https://github.com/gonzavadone10/scoutme-backend.git
```

Ingresar al proyecto

```bash
cd scoutme-backend
```

Instalar dependencias

```bash
npm install
```

---

## Configuración

Crear la base de datos en MySQL.

Modificar el archivo de conexión (`db.js`) con los datos correspondientes:

```javascript
host: "localhost",
user: "root",
password: "",
database: "scoutme"
```

---

## Ejecutar el servidor

```bash
npm start
```

o

```bash
node server.js
```

El servidor quedará disponible en

```
http://localhost:4000
```

---

## Endpoints principales

### Usuarios

- POST /api/auth/register
- POST /api/auth/login

### Perfiles

- GET /api/perfiles
- GET /api/perfiles/:usuarioId
- POST /api/perfiles
- PUT /api/perfiles/:usuarioId
- DELETE /api/perfiles/:usuarioId

### Estadísticas

- GET /api/estadisticas
- POST /api/estadisticas
- DELETE /api/estadisticas/:id

---

## Base de datos

El proyecto utiliza MySQL con las siguientes tablas principales:

- usuarios
- perfiles
- estadisticas

---

## Autor

Gonzalo Vadone

Proyecto académico - Analista de Sistemas