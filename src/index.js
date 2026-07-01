const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const perfilesRoutes = require("./routes/perfiles");
const contactoRoutes = require("./routes/contacto");
const adminRoutes = require("./routes/admin");
const estadisticasRoutes = require("./routes/estadisticas");

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ScoutMe API funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/perfiles", perfilesRoutes);
app.use("/api/contact", contactoRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/estadisticas", estadisticasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

