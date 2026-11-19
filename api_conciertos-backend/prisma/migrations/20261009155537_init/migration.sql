-- CreateTable
CREATE TABLE "Artista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "genero" TEXT,
    "descripcion" TEXT,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Concierto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha" DATETIME NOT NULL,
    "lugar" TEXT NOT NULL,
    "precio" REAL,
    "agotado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "artistaId" INTEGER NOT NULL,
    CONSTRAINT "Concierto_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "Artista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
