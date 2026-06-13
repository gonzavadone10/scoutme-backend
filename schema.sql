CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE,
  edad INTEGER,
  nacionalidad TEXT,
  posicion TEXT,
  club TEXT,
  altura REAL,
  peso REAL,
  pie_habil TEXT,
  biografia TEXT
);