import { useEffect, useState } from "react"
import api from "../../services/api"
import styles from "./home.module.css"
import { Link } from "react-router-dom"

interface Movies {
  id: number;
  title: string;
  poster_path: string;
}

export default function Home() {

  const [movies, setMovies] = useState<Movies[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: import.meta.env.VITE_KEY_API,
          language: "pt-BR",
          page: 1
        }
      })

      setMovies(response.data.results.slice(0, 10))
      setLoading(false)
    }

    loadMovies()

  }, [])

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.list_movies}>
        {movies.map((movie) => (
          <article key={movie.id}>
            <strong>{movie.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
            <Link to={`/movie/${movie.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
