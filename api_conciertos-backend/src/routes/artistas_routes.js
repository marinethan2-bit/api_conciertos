import { Router } from "express";

import {
  listarArtistas,
  obtenerArtista,
  crearArtista,
  actualizarArtista,
  eliminarArtista,
  listarConciertosDeArtista
} from "../controllers/artistas_controller.js";

import { comprobarApiKey } from "../middleware/apiKey.js";

const router = Router();

router.get("/", listarArtistas);
router.get("/:id/conciertos", listarConciertosDeArtista);
router.get("/:id", obtenerArtista);

router.post("/", comprobarApiKey, crearArtista);
router.patch("/:id", comprobarApiKey, actualizarArtista);
router.delete("/:id", comprobarApiKey, eliminarArtista);

export default router;
