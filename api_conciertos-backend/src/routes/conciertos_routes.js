import { Router } from "express";

import {
  listarConciertos,
  obtenerConcierto,
  crearConcierto,
  actualizarConcierto,
  eliminarConcierto
} from "../controllers/conciertos_controller.js";

import { comprobarApiKey } from "../middleware/apiKey.js";

const router = Router();

router.get("/", listarConciertos);
router.get("/:id", obtenerConcierto);

router.post("/", comprobarApiKey, crearConcierto);
router.patch("/:id", comprobarApiKey, actualizarConcierto);
router.delete("/:id", comprobarApiKey, eliminarConcierto);

export default router;