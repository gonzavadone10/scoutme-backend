import { getDb } from "../config/db.js";

export const createPlayerProfile = async ({
  user_id,
  edad,
  nacionalidad,
  posicion,
  club,
  altura,
  peso,
  pie_habil,
  biografia,
}) => {
  const db = await getDb();
  const result = await db.run(
    `INSERT INTO players (user_id, edad, nacionalidad, posicion, club, altura, peso, pie_habil, biografia)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, edad, nacionalidad, posicion, club, altura, peso, pie_habil, biografia]
  );
  return result.lastID;
};

export const getPlayerProfileByUserId = async (user_id) => {
  const db = await getDb();
  return db.get(`SELECT * FROM players WHERE user_id = ?`, [user_id]);
};

export const updatePlayerProfile = async (user_id, data) => {
  const db = await getDb();
  const { edad, nacionalidad, posicion, club, altura, peso, pie_habil, biografia } = data;

  await db.run(
    `UPDATE players
     SET edad = ?, nacionalidad = ?, posicion = ?, club = ?, altura = ?, peso = ?, pie_habil = ?, biografia = ?
     WHERE user_id = ?`,
    [edad, nacionalidad, posicion, club, altura, peso, pie_habil, biografia, user_id]
  );
};