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

El proyecto está desplegado en el plan gratuito de Render, por lo que hay que tener en cuenta algunas limitaciones:

- **SQLite y persistencia:** la base de datos SQLite se almacena en el sistema de archivos del servicio. En el plan gratuito de Render no se dispone de un disco persistente, por lo que los datos pueden perderse al reiniciar o volver a desplegar el servicio.
- **Datos iniciales:** al arrancar el backend se ejecutan las migraciones y la semilla. La semilla utiliza `upsert`, por lo que permite recuperar los datos iniciales sin duplicarlos. Sin embargo, los datos creados por los usuarios pueden perderse si se reinicia la base de datos.
- **Arranque en frío:** los servicios gratuitos de Render pueden suspenderse después de un periodo de inactividad. La primera petición posterior puede tardar más de lo habitual.
- **Alternativa:** para mantener los datos de forma persistente sería recomendable utilizar una base de datos PostgreSQL alojada en un servicio externo o con almacenamiento persistente.

Estas limitaciones corresponden al entorno gratuito utilizado para realizar las pruebas del despliegue.

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