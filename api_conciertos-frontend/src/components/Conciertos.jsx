
function Conciertos({ conciertos, artistas, onActualizarConcierto, onEliminarConcierto }) {

    return (
        <div>
            <h2>Conciertos</h2>

            {conciertos.length === 0 && <p>No hay conciertos disponibles.</p>}

            {conciertos.map((concierto) => (
                <div key={concierto.id}>
                    <h3>{concierto.titulo}</h3>
                    <p>Fecha: {concierto.fecha}</p>
                    <p>Lugar: {concierto.lugar}</p>
                    <p>Precio: {concierto.precio} €</p>

                    {/* NUEVO: formulario para editar el concierto */}
                    <form onSubmit={(event) => {
                        event.preventDefault()

                        let titulo = event.target.titulo.value
                        let descripcion = event.target.descripcion.value
                        let fecha = event.target.fecha.value
                        let lugar = event.target.lugar.value
                        let precio = event.target.precio.value
                        let artistaId = event.target.artistaId.value
                        let agotado = event.target.agotado.checked

                        onActualizarConcierto(concierto.id, {
                            titulo: titulo,
                            descripcion: descripcion,
                            fecha: fecha,
                            lugar: lugar,
                            precio: precio === "" ? null : Number(precio),
                            artistaId: Number(artistaId),
                            agotado: agotado
                        })
                    }}>

                        <input type="text" name="titulo" defaultValue={concierto.titulo} required />

                        <input type="text" name="descripcion" defaultValue={concierto.descripcion || ""} />

                        <input type="datetime-local" name="fecha" defaultValue={new Date(new Date(concierto.fecha).getTime() - new Date(concierto.fecha).getTimezoneOffset() * 60000).toISOString().slice(0, 16)} required />

                        <input type="text" name="lugar" defaultValue={concierto.lugar} required />

                        <input type="number" name="precio" step="0.01" defaultValue={concierto.precio ?? ""} />

                        <select name="artistaId" defaultValue={concierto.artistaId} required>
                            {artistas.map((artista) => (
                                <option key={artista.id} value={artista.id}>
                                    {artista.nombre}
                                </option>
                            ))}
                        </select>

                        <label>
                            <input type="checkbox" name="agotado" defaultChecked={concierto.agotado} />
                            Entradas agotadas
                        </label>

                        <button type="submit">Guardar cambios</button>

                    </form>

                    {/* NUEVO: botón para eliminar el concierto */}
                    <button onClick={() => onEliminarConcierto(concierto.id)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Conciertos