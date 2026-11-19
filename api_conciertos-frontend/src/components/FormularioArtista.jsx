import { useState } from 'react'

function FormularioArtista({ onCrearArtista }) {

    // Guardamos los datos del formulario
    const [nombre, setNombre] = useState("")
    const [genero, setGenero] = useState("")
    const [descripcion, setDescripcion] = useState("")

    // Enviamos los datos del formulario
    function enviarFormulario(event) {
        event.preventDefault()

        onCrearArtista({
            nombre: nombre,
            genero: genero,
            descripcion: descripcion
        })

        // Limpiamos los campos
        setNombre("")
        setGenero("")
        setDescripcion("")
    }

    return (
        <div>
            <h2>Crear artista</h2>

            <form onSubmit={enviarFormulario}>

                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    required
                />

                <label>Género:</label>
                <input
                    type="text"
                    value={genero}
                    onChange={(event) => setGenero(event.target.value)}
                    required
                />

                <label>Descripción:</label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
                    required
                />

                <button type="submit">Crear artista</button>

            </form>
        </div>
    )
}

export default FormularioArtista