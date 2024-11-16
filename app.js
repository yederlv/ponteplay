const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Importar las canciones
const songs = require("./songs.json");

// Endpoint para obtener canciones
app.get("/api/songs", (req, res) => {
  res.json(songs);
});

// Endpoint para obtener una canción por ID
app.get("/api/songs/:id", (req, res) => {
  const song = songs.find((s) => s.id === parseInt(req.params.id));
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
