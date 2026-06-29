import express from "express";
import {
  createPlayerProfile,
  getPlayerProfileByUserId,
  updatePlayerProfile,
} from "../models/Player.js";

const router = express.Router();

// Crear perfil
router.post("/", async (req, res) => {
  try {
    const id = await createPlayerProfile(req.body);
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener perfil por user_id
router.get("/:userId", async (req, res) => {
  try {
    const profile = await getPlayerProfileByUserId(req.params.userId);
    res.json(profile || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar perfil por user_id
router.put("/:userId", async (req, res) => {
  try {
    await updatePlayerProfile(req.params.userId, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;