# API de Conciertos

Aplicación web para gestionar artistas y conciertos. El proyecto está dividido en un backend desarrollado con Express y un frontend desarrollado con React y Vite.

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- SQLite
- JavaScript

### Frontend
- React
- Vite
- JavaScript
- CSS

## Estructura del proyecto

```text
api_conciertos/
├── api_conciertos-backend/
└── api_conciertos-frontend/
```

## Instalación y ejecución

### Backend

Entrar en la carpeta:

```bash
cd api_conciertos-backend
```

Instalar dependencias:

```bash
npm install
```

Configurar las variables de entorno utilizando `.env.example` como referencia.

Generar Prisma Client y preparar la base de datos:

```bash
npm run build
npm run migrate:deploy
npm run seed
```

Iniciar el servidor:

```bash
npm run dev
```

### Frontend

Entrar en la carpeta:

```bash
cd api_conciertos-frontend
```

Instalar dependencias:

```bash
npm install
```

Configurar las variables de entorno utilizando `.env.example` como referencia.

Iniciar la aplicación:

```bash
npm run dev
```

## Variables de entorno

El backend necesita configurar `DATABASE_URL`, `API_KEY` y `FRONTEND_URL`.

El frontend necesita configurar `VITE_API_URL`, que indica la dirección de la API.

Los archivos `.env` reales no se incluyen en el repositorio.

## Despliegue

El despliegue se realizará utilizando Render, con un servicio web para el backend y un sitio estático para el frontend.

- GitHub: pendiente.
- Backend: pendiente.
- Frontend: pendiente.

## Consideraciones

La base de datos SQLite utilizada en el despliegue gratuito de Render puede perder sus datos al reiniciarse el servicio, debido al almacenamiento efímero. Para una persistencia permanente sería recomendable utilizar una base de datos externa, como PostgreSQL.

Los servicios gratuitos de Render también pueden tardar en responder después de un periodo de inactividad.