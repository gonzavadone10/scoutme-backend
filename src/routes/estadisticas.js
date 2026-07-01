const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:perfilId", async (req, res) => {
  try {
    const { perfilId } = req.params;

    const [estadisticas] = await db.query(
      "SELECT * FROM estadisticas WHERE perfil_id = ? ORDER BY id DESC",
      [perfilId]
    );

    res.json(estadisticas);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { perfilId, rival, partidos, goles, asistencias, minutos } = req.body;

    if (!perfilId) {
      return res.status(400).json({ message: "El perfil es obligatorio" });
    }

    await db.query(
      `INSERT INTO estadisticas 
      (perfil_id, rival, partidos, goles, asistencias, minutos)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [perfilId, rival, partidos || 1, goles || 0, asistencias || 0, minutos || 0]
    );

    res.status(201).json({ message: "Estadística guardada correctamente" });
  } catch (error) {
    console.error("Error al guardar estadística:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM estadisticas WHERE id = ?",
      [id]
    );

    res.json({
      message: "Estadística eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar estadística:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

module.exports = router;