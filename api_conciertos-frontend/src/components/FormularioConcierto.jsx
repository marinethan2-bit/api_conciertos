import { useState } from 'react'

function FormularioConcierto({ onCrearConcierto, artistas }) {

    // Guardamos los datos del formulario
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [fecha, setFecha] = useState("")
    const [lugar, setLugar] = useState("")
    const [precio, setPrecio] = useState("")
    const [artistaId, setArtistaId] = useState("")
    const [agotado, setAgotado] = useState(false)

    // Enviamos los datos del formulario
    function enviarFormulario(event) {
        event.preventDefault()

        onCrearConcierto({
            titulo: titulo,
            descripcion: descripcion,
            fecha: fecha,
            lugar: lugar,
            precio: precio === "" ? null : Number(precio),
            artistaId: Number(artistaId),
            agotado: agotado
        })

        // Limpiamos los campos
        setTitulo("")
        setDescripcion("")
        setFecha("")
        setLugar("")
        setPrecio("")
        setArtistaId("")
        setAgotado(false)
    }

    return (
        <div>
            <h2>Crear concierto</h2>
            <form onSubmit={enviarFormulario}>
                <label>Título:</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                    required
                />

                <label>Descripción:</label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
                />

                <label>Fecha:</label>
                <input
                    type="datetime-local"
                    value={fecha}
                    onChange={(event) => setFecha(event.target.value)}
                    required
                />

                <label>Lugar:</label>
                <input
                    type="text"
                    value={lugar}
                    onChange={(event) => setLugar(event.target.value)}
                    required
                />

                <label>Precio:</label>
                <input
                    type="number"
                    step="0.01"
                    value={precio}
                    onChange={(event) => setPrecio(event.target.value)}
                />

                <label>Artista:</label>
                <select
                    value={artistaId}
                    onChange={(event) => setArtistaId(event.target.value)}
                    required
                >
                    <option value="">Selecciona un artista</option>

                    {artistas.map((artista) => (
                        <option key={artista.id} value={artista.id}>
                            {artista.nombre}
                        </option>
                    ))}
                </select>

                <label>
                    <input
                        type="checkbox"
                        checked={agotado}
                        onChange={(event) => setAgotado(event.target.checked)}
                    />
                    Entradas agotadas
                </label>

                <button type="submit">Crear concierto</button>

            </form>

        </div>
    )
}

export default FormularioConcierto