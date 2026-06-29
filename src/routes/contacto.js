const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;

    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO contactos (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)",
      [nombre, email, asunto, mensaje]
    );

    res.json({
      message: "Mensaje enviado correctamente",
    });
  } catch (error) {
    console.error("Error en contacto:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

module.exports = router;