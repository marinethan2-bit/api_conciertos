
import prisma from "../lib/prisma.js";

export async function listarArtistas(req, res) {
  try {
    const artistas = await prisma.artista.findMany({
      orderBy: { id: "asc" }
    });
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los artistas" });
  }
}

export async function obtenerArtista(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const artista = await prisma.artista.findUnique({
      where: { id }
    });

    if (!artista) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.json(artista);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el artista" });
  }
}


export async function crearArtista(req, res) {
  try {
    const { nombre, genero, descripcion } = req.body;

    // Comprobar que el nombre existe y es texto
    if (typeof nombre !== "string" || nombre.trim().length < 2) {
      return res.status(400).json({
        error: "El nombre es obligatorio y debe tener al menos 2 caracteres"
      });
    }

    // Comprobar los tipos de los campos opcionales
    if (
      genero !== undefined &&
      genero !== null &&
      typeof genero !== "string"
    ) {
      return res.status(400).json({
        error: "El género debe ser un texto"
      });
    }

    if (
      descripcion !== undefined &&
      descripcion !== null &&
      typeof descripcion !== "string"
    ) {
      return res.status(400).json({
        error: "La descripción debe ser un texto"
      });
    }

    const artista = await prisma.artista.create({
      data: {
        nombre: nombre.trim(),
        genero: genero?.trim() || null,
        descripcion: descripcion?.trim() || null
      }
    });

    return res.status(201).json(artista);
  } catch (error) {
    console.error("Error al crear artista:", error);

    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}

export async function actualizarArtista(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.artista.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    const { nombre, genero, descripcion } = req.body;
    const datos = {};

    if (nombre !== undefined) {
      if (typeof nombre !== "string" || nombre.trim().length < 2) {
        return res.status(400).json({
          error: "El nombre debe tener al menos 2 caracteres"
        });
      }
      datos.nombre = nombre.trim();
    }

    if (genero !== undefined) {
      datos.genero = genero?.trim() || null;
    }

    if (descripcion !== undefined) {
      datos.descripcion = descripcion?.trim() || null;
    }

    const artista = await prisma.artista.update({
      where: { id },
      data: datos
    });

    res.json(artista);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el artista" });
  }
}

export async function eliminarArtista(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.artista.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    const conciertos = await prisma.concierto.findMany({
      where: { artistaId: id }
    });

    if (conciertos.length > 0) {
      return res.status(400).json({
        error: "No se puede eliminar un artista que tiene conciertos asociados"
      });
    }
    
    await prisma.artista.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el artista" });
  }
}

export async function listarConciertosDeArtista(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const artista = await prisma.artista.findUnique({
      where: { id }
    });

    if (!artista) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    const conciertos = await prisma.concierto.findMany({
      where: { artistaId: id },
      orderBy: { id: "asc" }
    });

    res.json(conciertos);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los conciertos del artista" });
  }
}