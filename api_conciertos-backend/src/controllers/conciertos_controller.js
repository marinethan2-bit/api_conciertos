
import prisma from "../lib/prisma.js";

export async function listarConciertos(req, res) {
  try {
    const { agotado } = req.query;
    const where = {};

    if (agotado !== undefined) {
      if (agotado !== "true" && agotado !== "false") {
        return res.status(400).json({
          error: "agotado debe ser true o false"
        });
      }

      where.agotado = agotado === "true";
    }

    const conciertos = await prisma.concierto.findMany({
      where,
      orderBy: { id: "asc" }
    });

    res.json(conciertos);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los conciertos" });
  }
}

export async function obtenerConcierto(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const concierto = await prisma.concierto.findUnique({
      where: { id }
    });

    if (!concierto) {
      return res.status(404).json({ error: "Concierto no encontrado" });
    }

    res.json(concierto);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el concierto" });
  }
}


export async function crearConcierto(req, res) {
  try {
    const {
      titulo,
      descripcion,
      fecha,
      lugar,
      precio,
      agotado,
      artistaId
    } = req.body;

    // Validar el título
    if (typeof titulo !== "string" || titulo.trim().length < 3) {
      return res.status(400).json({
        error: "El título es obligatorio y debe tener al menos 3 caracteres"
      });
    }

    // Validar la descripción, si se proporciona
    if (
      descripcion !== undefined &&
      descripcion !== null &&
      typeof descripcion !== "string"
    ) {
      return res.status(400).json({
        error: "La descripción debe ser un texto"
      });
    }

    // Validar la fecha
    if (
      typeof fecha !== "string" ||
      fecha.trim() === "" ||
      Number.isNaN(Date.parse(fecha))
    ) {
      return res.status(400).json({
        error: "La fecha es obligatoria y debe ser válida"
      });
    }

    // Validar el lugar
    if (typeof lugar !== "string" || lugar.trim().length === 0) {
      return res.status(400).json({
        error: "El lugar es obligatorio"
      });
    }

    // Validar el precio, si se proporciona
    if (
      precio !== undefined &&
      precio !== null &&
      (typeof precio !== "number" ||
        !Number.isFinite(precio) ||
        precio < 0)
    ) {
      return res.status(400).json({
        error: "El precio debe ser un número válido y no negativo"
      });
    }

    // Validar agotado
    if (agotado !== undefined && typeof agotado !== "boolean") {
      return res.status(400).json({
        error: "El campo agotado debe ser true o false"
      });
    }

    // Validar artistaId
    if (!Number.isInteger(artistaId) || artistaId <= 0) {
      return res.status(400).json({
        error: "artistaId debe ser un número entero positivo"
      });
    }

    // Comprobar que el artista existe
    const artista = await prisma.artista.findUnique({
      where: { id: artistaId }
    });

    if (!artista) {
      return res.status(400).json({
        error: "El artista indicado no existe"
      });
    }

    // Crear el concierto
    const concierto = await prisma.concierto.create({
      data: {
        titulo: titulo.trim(),
        descripcion: descripcion?.trim() || null,
        fecha: new Date(fecha),
        lugar: lugar.trim(),
        precio: precio ?? null,
        agotado: agotado ?? false,
        artistaId
      }
    });

    return res.status(201).json(concierto);
  } catch (error) {
    console.error("Error al crear concierto:", error);

    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

export async function actualizarConcierto(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.concierto.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Concierto no encontrado" });
    }

    const {
      titulo,
      descripcion,
      fecha,
      lugar,
      precio,
      agotado,
      artistaId
    } = req.body;

    const datos = {};

    if (titulo !== undefined) {
      if (typeof titulo !== "string" || titulo.trim().length < 3) {
        return res.status(400).json({
          error: "El titulo debe tener al menos 3 caracteres"
        });
      }
      datos.titulo = titulo.trim();
    }

    if (descripcion !== undefined) {
      datos.descripcion = descripcion?.trim() || null;
    }

    if (fecha !== undefined) {
      datos.fecha = new Date(fecha);
    }

    if (lugar !== undefined) {
      datos.lugar = lugar.trim();
    }

    if (precio !== undefined) {
      datos.precio = precio;
    }

    if (agotado !== undefined) {
      if (typeof agotado !== "boolean") {
        return res.status(400).json({
          error: "agotado debe ser true o false"
        });
      }
      datos.agotado = agotado;
    }

    if (artistaId !== undefined) {
      datos.artistaId = artistaId;
    }

    const concierto = await prisma.concierto.update({
      where: { id },
      data: datos
    });

    res.json(concierto);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el concierto" });
  }
}

export async function eliminarConcierto(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.concierto.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Concierto no encontrado" });
    }

    await prisma.concierto.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el concierto" });
  }
}