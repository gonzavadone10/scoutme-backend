const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register", async (req, res) => {
  try {
    const { nombreCompleto, email, password, role } = req.body;

    if (!nombreCompleto || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const [exists] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (exists.length > 0) {
      return res.status(409).json({
        message: "El correo ya está registrado",
      });
    }

    await db.query(
      "INSERT INTO usuarios (nombre_completo, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombreCompleto, email, password, role || "Jugador"]
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const user = users[0];

    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        nombreCompleto: user.nombre_completo,
        email: user.email,
        role: user.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

module.exports = router;