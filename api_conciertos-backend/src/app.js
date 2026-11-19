import express from "express";
import cors from "cors";
import artistasRouter from "./routes/artistas_routes.js";
import conciertosRouter from "./routes/conciertos_routes.js";
import { logger } from "./middleware/logger.js";

const app = express();

const origenesPermitidos = [
  process.env.FRONTEND_URL,
  ...(process.env.NODE_ENV !== "production"
    ? ["http://localhost:5173"]
    : [])
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origenesPermitidos.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origen no permitido por CORS"));
    }
  }
}));

app.use(express.json());
app.use(logger);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de artistas y conciertos funcionando"
  });
});

app.get("/health", (req, res) => {
  res.json({
    estado: "OK"
  });
});

// Rutas de la API
app.use("/api/artistas", artistasRouter);
app.use("/api/conciertos", conciertosRouter);

// Ruta para endpoints inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

app.use((error, req, res, next) => {
  console.error("Error en el servidor:", error.message);

  res.status(500).json({
    error: "Error interno del servidor"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});