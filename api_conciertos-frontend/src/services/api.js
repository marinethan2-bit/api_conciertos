const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los artistas
export async function obtenerArtistas() {
    let respuesta = await fetch(`${API_URL}/artistas`);

    if (!respuesta.ok) {
        throw new Error("Error al obtener los artistas");
    }

    return await respuesta.json();
}

// Obtener todos los conciertos
export async function obtenerConciertos() {
    let respuesta = await fetch(`${API_URL}/conciertos`);

    if (!respuesta.ok) {
        throw new Error("Error al obtener los conciertos");
    }

    return await respuesta.json();
}

// Crear un artista
export async function crearArtista(artista) {
    let respuesta = await fetch(`${API_URL}/artistas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": sessionStorage.getItem("apiKey")
        },
        body: JSON.stringify(artista)
    });

    if (!respuesta.ok) {
        if (respuesta.status === 401) {
            throw new Error("API Key incorrecta o ausente");
        }

        if (respuesta.status === 400) {
            throw new Error("Los datos del artista no son válidos");
        }

        throw new Error("No se pudo crear el artista");
    }

    return await respuesta.json();
}

// Crear un concierto
export async function crearConcierto(concierto) {
    let respuesta = await fetch(`${API_URL}/conciertos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": sessionStorage.getItem("apiKey")
        },
        body: JSON.stringify(concierto)
    });

    if (!respuesta.ok) {
        if (respuesta.status === 401) {
            throw new Error("API Key incorrecta o ausente");
        }

        if (respuesta.status === 400) {
            throw new Error("Los datos del concierto no son válidos");
        }

        throw new Error("No se pudo crear el concierto");
    }

    return await respuesta.json();
}

// Actualizar un artista
export async function actualizarArtista(id, artista) {
    let respuesta = await fetch(`${API_URL}/artistas/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": sessionStorage.getItem("apiKey")
        },
        body: JSON.stringify(artista)
    });

    if (!respuesta.ok) {
        if (respuesta.status === 401) {
            throw new Error("API Key incorrecta o ausente");
        }

        if (respuesta.status === 400) {
            throw new Error("Los datos del artista no son válidos");
        }

        if (respuesta.status === 404) {
            throw new Error("Artista no encontrado");
        }

        throw new Error("No se pudo actualizar el artista");
    }

    return await respuesta.json();
}

// Actualizar un concierto
export async function actualizarConcierto(id, concierto) {
    let respuesta = await fetch(`${API_URL}/conciertos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": sessionStorage.getItem("apiKey")
        },
        body: JSON.stringify(concierto)
    });

    if (!respuesta.ok) {
        if (respuesta.status === 401) {
            throw new Error("API Key incorrecta o ausente");
        }

        if (respuesta.status === 400) {
            throw new Error("Los datos del concierto no son válidos");
        }

        if (respuesta.status === 404) {
            throw new Error("Concierto no encontrado");
        }

        throw new Error("No se pudo actualizar el concierto");
    }

    return await respuesta.json();
}

// Eliminar un artista
export async function eliminarArtista(id) {
    let respuesta = await fetch(`${API_URL}/artistas/${id}`, {
        method: "DELETE",
        headers: {
            "x-api-key": sessionStorage.getItem("apiKey")
        }
    });

    if (!respuesta.ok) {
        if (respuesta.status === 401) {
            throw new Error("API Key incorrecta o ausente");
        }

        if (respuesta.status === 400) {
            throw new Error("No se puede eliminar un artista que tiene conciertos asociados");
        }

        if (respuesta.status === 404) {
            throw new Error("Artista no encontrado");
        }

        throw new Error("No se pudo eliminar el artista");
    }

}

// Eliminar un concierto
export async function eliminarConcierto(id) {
    let respuesta = await fetch(`${API_URL}/conciertos/${id}`, {
        method: "DELETE",
        headers: {
            "x-api-key": sessionStorage.getItem("apiKey")
        }
    });

    if (!respuesta.ok) {
        if (respuesta.status === 401) {
            throw new Error("API Key incorrecta o ausente");
        }

        if (respuesta.status === 404) {
            throw new Error("Concierto no encontrado");
        }

        throw new Error("No se pudo eliminar el concierto");
    }
}