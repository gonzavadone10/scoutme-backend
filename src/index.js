const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Permitir llamadas desde el frontend (Vite usa 5173 por defecto)
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// "Base de datos" en memoria (solo para pruebas)
const users = [];
const contacts = [];

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("ScoutMe API funcionando");
});

// Registro de usuario
app.post("/api/auth/register", (req, res) => {
  console.log("BODY RECIBIDO:", req.body);

  const { nombreCompleto, email, password } = req.body;

  if (!nombreCompleto || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const exists = users.find((u) => u.email === email);

  if (exists) {
    return res.status(409).json({
      message: "El correo ya está registrado",
    });
  }

  const newUser = {
    id: users.length + 1,
    nombreCompleto,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).json({
    message: "Usuario registrado correctamente",
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // En un proyecto real devolveríamos un JWT
  res.json({
    message: "Inicio de sesión exitoso",
    user: {
      id: user.id,
      nombreCompleto: user.nombreCompleto,
      email: user.email
    }
  });
});

// Contacto
app.post("/api/contact", (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  contacts.push({
    id: contacts.length + 1,
    nombre,
    email,
    asunto,
    mensaje,
    fecha: new Date()
  });

  res.json({ message: "Mensaje enviado correctamente" });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});