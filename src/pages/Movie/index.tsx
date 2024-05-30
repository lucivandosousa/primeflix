import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../services/api"
import styles from "./movie.module.css"
import { toast } from "react-toastify"

interface Movie {
  title: string,
  backdrop_path: string,
  overview: string,
  vote_average: number
}

export default function Movie() {

  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const natigate = useNavigate()

  useEffect(() => {
    async function loadMovie() {
      await api.get(`movie/${id}`, {
        params: {
          api_key: import.meta.env.VITE_KEY_API,
          language: "pt-BR",
        }
      })
        .then((response) => {
          setMovie(response.data)
          setLoading(false)
        })
        .catch(() => {
          natigate("/", { replace: true })
          return
        })
    }

    loadMovie()

  }, [id, natigate])

  function favoriteMovie() {
    const myFavoritesList = localStorage.getItem("prime_flix_favorite")

    let favoritesMovies = JSON.parse(myFavoritesList) || []

    const hasMovie = Array.isArray(favoritesMovies) && favoritesMovies.some((favoriteMovie) => favoriteMovie.id === movie.id)

    if (hasMovie) {
      toast.warn("O filme já está na sua lista de favoritos!")
      return
    }

    localStorage.setItem("prime_flix_favorite", JSON.stringify([...favoritesMovies, movie]))
    toast.success("Filme adicionado na sua lista de favoritos!")
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Carregando detalhes...</h2>
      </div>
    )
  }

  if (movie) {
    return (
      <div className={styles.movie_details}>
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

        <h3>Sinopse</h3>
        <span>{movie.overview}</span>

        <strong>Avaliações: {movie.vote_average}</strong>

        <div className={styles.area_buttons}>
          <button onClick={favoriteMovie}>Salvar</button>
          <button>
            <a href={`https://www.youtube.com/results?search_query=${movie.title}`} target="_blank" rel="external">Trailer</a>
          </button>
        </div>
      </div>
    )
  }
}
