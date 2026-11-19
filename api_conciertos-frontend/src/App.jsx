import { useState, useEffect } from 'react'
import {obtenerArtistas, obtenerConciertos, crearArtista, crearConcierto, actualizarArtista, actualizarConcierto, eliminarArtista, eliminarConcierto} from './services/api'
import './App.css'
import Artistas from './components/Artistas'
import Conciertos from './components/Conciertos'
import FormularioArtista from './components/FormularioArtista'
import FormularioConcierto from './components/FormularioConcierto'

function App() {

  // Guardamos los artistas y conciertos
  const [artistas, setArtistas] = useState([])
  const [conciertos, setConciertos] = useState([])

  // Guardamos los posibles errores
  const [error, setError] = useState("")

  // Controlamos si estamos cargando los datos
  const [cargando, setCargando] = useState(true)

  // Guardamos la API Key
  const [apiKey, setApiKey] = useState(sessionStorage.getItem("apiKey") || "")

  // Guardar la API Key en sessionStorage
  function guardarApiKey(event) {
      event.preventDefault()

      sessionStorage.setItem("apiKey", apiKey)

      alert("API Key guardada")
  }



  // Crear un artista nuevo
  async function manejarCrearArtista(artista) {
      try {
          let nuevoArtista = await crearArtista(artista)

          setArtistas([...artistas, nuevoArtista])
          setError("")

      } catch (error) {
          setError(error.message)
      }
  }

  // Crear un concierto nuevo
  async function manejarCrearConcierto(concierto) {
      try {
          let nuevoConcierto = await crearConcierto(concierto)

          setConciertos([...conciertos, nuevoConcierto])
          setError("")

      } catch (error) {
          setError(error.message)
      }
  }

  // Actualizar un artista
  async function manejarActualizarArtista(id, artista) {
      try {
          let artistaActualizado = await actualizarArtista(id, artista)

          setArtistas(artistas.map((elemento) =>
              elemento.id === id ? artistaActualizado : elemento
          ))
          setError("")

      } catch (error) {
          setError(error.message)
      }
  }

  // Actualizar un concierto
  async function manejarActualizarConcierto(id, concierto) {
      try {
          let conciertoActualizado = await actualizarConcierto(id, concierto)

          setConciertos(conciertos.map((elemento) =>
              elemento.id === id ? conciertoActualizado : elemento
          ))

          setError("")

      } catch (error) {
          setError(error.message)
      }
  }

  // Eliminar un artista
  async function manejarEliminarArtista(id) {
      try {
          await eliminarArtista(id)

          setArtistas(artistas.filter((elemento) =>
              elemento.id !== id
          ))
          setError("")

      } catch (error) {
          setError(error.message)
      }
  }

  // Eliminar un concierto
  async function manejarEliminarConcierto(id) {
      try {
          await eliminarConcierto(id)

          setConciertos(conciertos.filter((elemento) =>
              elemento.id !== id
          ))

          setError("")

      } catch (error) {
          setError(error.message)
      }
  }

  // Cargamos los datos al entrar en la página
  useEffect(() => {

    async function cargarDatos() {
      try {
        let datosArtistas = await obtenerArtistas()
        let datosConciertos = await obtenerConciertos()

        setArtistas(datosArtistas)
        setConciertos(datosConciertos)

      } catch (error) {
        if (error.message === "Failed to fetch") {
          setError("No se pudo conectar con el servidor. Comprueba que el backend está funcionando.")
        } else {
          setError(error.message)
        }
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()

  }, [])

  return (
    <div>
        <h1>API de Conciertos</h1>
        <form onSubmit={guardarApiKey}>
          <h2>Autenticación</h2>

          <label>API Key:</label>
          <input
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              required
          />

          <button type="submit">Guardar API Key</button>
      </form>

        {error !== "" && <p>{error}</p>}

        {cargando && <p>Cargando datos...</p>}

        {!cargando && (
          <>
            <FormularioArtista onCrearArtista={manejarCrearArtista} />

            <FormularioConcierto onCrearConcierto={manejarCrearConcierto} artistas={artistas}/>

            <Artistas artistas={artistas} onActualizarArtista={manejarActualizarArtista} onEliminarArtista={manejarEliminarArtista}/>

            <Conciertos conciertos={conciertos} artistas={artistas} onActualizarConcierto={manejarActualizarConcierto} onEliminarConcierto={manejarEliminarConcierto}/>
          </>
        )}
    </div>
  )
}

export default App
