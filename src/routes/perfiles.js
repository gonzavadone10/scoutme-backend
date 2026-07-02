const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [perfiles] = await db.query(`
      SELECT 
        perfiles.id AS perfil_id,
        perfiles.usuario_id,
        usuarios.nombre_completo,
        usuarios.email,
        usuarios.rol,
        perfiles.edad,
        perfiles.posicion,
        perfiles.club,
        perfiles.pie_habil,
        perfiles.biografia,
        COALESCE(SUM(estadisticas.goles), 0) AS goles,
        COALESCE(SUM(estadisticas.asistencias), 0) AS asistencias,
        COALESCE(SUM(estadisticas.minutos), 0) AS minutos
      FROM perfiles
      INNER JOIN usuarios ON perfiles.usuario_id = usuarios.id
      LEFT JOIN estadisticas ON perfiles.id = estadisticas.perfil_id
      GROUP BY 
        perfiles.id,
        perfiles.usuario_id,
        usuarios.nombre_completo,
        usuarios.email,
        usuarios.rol,
        perfiles.edad,
        perfiles.posicion,
        perfiles.club,
        perfiles.pie_habil,
        perfiles.biografia
      ORDER BY perfiles.id DESC
    `);

    res.json(perfiles);
  } catch (error) {
    console.error("Error al obtener perfiles:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

router.get("/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const [perfiles] = await db.query(
      "SELECT * FROM perfiles WHERE usuario_id = ?",
      [usuarioId]
    );

    if (perfiles.length === 0) {
      return res.status(404).json({
        message: "Perfil no encontrado",
      });
    }

    res.json(perfiles[0]);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      usuarioId,
      edad,
      posicion,
      club,
      pieHabil,
      biografia,
    } = req.body;

    if (!usuarioId) {
      return res.status(400).json({
        message: "El usuario es obligatorio",
      });
    }

    const [exists] = await db.query(
      "SELECT * FROM perfiles WHERE usuario_id = ?",
      [usuarioId]
    );

    if (exists.length > 0) {
      return res.status(409).json({
        message: "El usuario ya tiene un perfil creado",
      });
    }

    await db.query(
      `INSERT INTO perfiles 
      (usuario_id, edad, posicion, club, pie_habil, biografia)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [usuarioId, edad, posicion, club, pieHabil, biografia]
    );

    res.status(201).json({
      message: "Perfil creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear perfil:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

router.put("/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { edad, posicion, club, pieHabil, biografia } = req.body;

    await db.query(
      `UPDATE perfiles 
       SET edad = ?, posicion = ?, club = ?, pie_habil = ?, biografia = ?
       WHERE usuario_id = ?`,
      [edad, posicion, club, pieHabil, biografia, usuarioId]
    );

    res.json({
      message: "Perfil actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

router.delete("/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;

    await db.query(
      "DELETE FROM perfiles WHERE usuario_id = ?",
      [usuarioId]
    );

    res.json({
      message: "Perfil eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar perfil:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

module.exports = router;