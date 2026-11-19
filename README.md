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

El proyecto está desplegado utilizando Render, con un servicio web para el backend y un sitio estático para el frontend.

- GitHub: https://github.com/marinethan2-bit/api_conciertos
- Backend: https://api-conciertos-backend.onrender.com
- Frontend: https://api-conciertos-frontend.onrender.com

### Endpoints del backend

- `/`: comprueba que la API está funcionando.
- `/health`: comprueba el estado del servidor.
- `/api/artistas`: consulta los artistas.
- `/api/conciertos`: consulta los conciertos.

## Consideraciones

La base de datos SQLite utilizada en el despliegue gratuito de Render puede perder sus datos al reiniciarse el servicio, debido al almacenamiento efímero. Para una persistencia permanente sería recomendable utilizar una base de datos externa, como PostgreSQL.

Los servicios gratuitos de Render también pueden tardar en responder después de un periodo de inactividad.

## Pruebas realizadas

Se han comprobado las operaciones CRUD desde el frontend desplegado en Render:

- **READ:** consulta de artistas y conciertos.
- **CREATE:** creación de artistas y conciertos.
- **UPDATE:** modificación de artistas y conciertos.
- **DELETE:** eliminación de artistas y conciertos.

Todas las pruebas se han completado correctamente.

## Diagnóstico de incidencias mediante logs

Se ha realizado una prueba controlada para comprobar el registro de peticiones y la gestión de errores del backend desplegado en Render.

**Prueba realizada:**

1. Se ha solicitado la ruta `/ruta-inexistente`.
2. Render ha registrado la petición en los logs mediante el middleware `logger.js`.
3. El backend ha respondido con el estado HTTP 404 y el mensaje `Ruta no encontrada`.

**Resultado:**

La petición aparece correctamente en los logs y el manejador de rutas inexistentes devuelve la respuesta esperada.