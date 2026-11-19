function Artistas({ artistas, onActualizarArtista, onEliminarArtista }) {

    return (
        <div>
            <h2>Artistas</h2>

            {artistas.length === 0 && <p>No hay artistas disponibles.</p>}
            
            {artistas.map((artista) => (
                <div key={artista.id}>
                    <h3>{artista.nombre}</h3>
                    <p>Género: {artista.genero}</p>
                    <p>{artista.descripcion}</p>
                    <form onSubmit={(event) => {
                        event.preventDefault()

                        let nombre = event.target.nombre.value
                        let genero = event.target.genero.value
                        let descripcion = event.target.descripcion.value

                        onActualizarArtista(artista.id, {
                            nombre: nombre,
                            genero: genero,
                            descripcion: descripcion
                        })
                    }}>

                        <input type="text" name="nombre" defaultValue={artista.nombre} required />

                        <input type="text" name="genero" defaultValue={artista.genero} required />

                        <input type="text" name="descripcion" defaultValue={artista.descripcion} required />

                        <button type="submit">Guardar cambios</button>

                    </form>

                    <button onClick={() => onEliminarArtista(artista.id)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Artistas