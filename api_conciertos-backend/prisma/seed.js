
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

async function main() {

  // Crear artistas
  await prisma.artista.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nombre: "Coldplay",
      genero: "Pop rock",
      descripcion: "Grupo británico de pop rock",
      web: "https://www.coldplay.com"
    }
  });

  await prisma.artista.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      nombre: "Imagine Dragons",
      genero: "Pop rock",
      descripcion: "Banda estadounidense de pop rock",
      web: "https://www.imaginedragonsmusic.com"
    }
  });

  // Crear conciertos
  await prisma.concierto.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titulo: "Coldplay World Tour",
      descripcion: "Concierto de Coldplay",
      fecha: new Date("2027-06-15T20:00:00"),
      lugar: "Madrid",
      precio: 85,
      agotado: false,
      artistaId: 1
    }
  });

  await prisma.concierto.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      titulo: "Imagine Dragons Live",
      descripcion: "Concierto de Imagine Dragons",
      fecha: new Date("2027-07-20T21:00:00"),
      lugar: "Barcelona",
      precio: 75,
      agotado: false,
      artistaId: 2
    }
  });

  console.log("Semilla ejecutada correctamente");
}

main()
  .catch((error) => {
    console.error("Error al ejecutar la semilla:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });