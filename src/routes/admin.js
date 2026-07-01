const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/resumen", async (req, res) => {
    try {
        const [usuarios] = await db.query("SELECT COUNT(*) AS total FROM usuarios");
        const [perfiles] = await db.query("SELECT COUNT(*) AS total FROM perfiles");

        const [roles] = await db.query(`
SELECT rol, COUNT(*) AS cantidad
FROM usuarios
GROUP BY rol
`);

        const admins =
            roles.find((r) => r.rol === "Admin")?.cantidad || 0;

        const jugadores =
            roles.find((r) => r.rol === "Jugador")?.cantidad || 0;

        const entrenadores =
            roles.find((r) => r.rol === "Entrenador")?.cantidad || 0;

        const scouts =
            roles.find((r) => r.rol === "Scout")?.cantidad || 0;

        res.json({
            usuarios: usuarios[0].total,
            perfiles: perfiles[0].total,
            admins,
            jugadores,
            entrenadores,
            scouts,
            roles,
        });
    } catch (error) {
        console.error("Error en resumen admin:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/usuarios", async (req, res) => {
    try {
        const [usuarios] = await db.query(`
      SELECT id, nombre_completo, email, rol, fecha_creacion
      FROM usuarios
      ORDER BY id DESC
    `);

        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;