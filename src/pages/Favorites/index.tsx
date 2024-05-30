import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./favorites.module.css"
import { toast } from "react-toastify";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
}

export default function Favorites() {

  const [favoritesMovies, setFavoritesMovies] = useState<Movies[]>([])

  useEffect(() => {
    const myFavoritesList = localStorage.getItem("prime_flix_favorite")

    let movies = JSON.parse(myFavoritesList) || []

    setFavoritesMovies(movies)
  },[])

  function deleteFavoriteMovie(movie_id) {
    const myFavoritesList = localStorage.getItem("prime_flix_favorite")

    let myList = JSON.parse(myFavoritesList) || []

    let newList = Array.isArray(myList) && myList.filter((movie) => movie.id !== movie_id)

    setFavoritesMovies(newList)
    localStorage.setItem("prime_flix_favorite", JSON.stringify(newList))
    toast.success("O filme foi removido!")
  }

  return (
    <div className={styles.container}>
      {favoritesMovies.length !== 0 ? <h1>Meus Favoritos</h1> : <h1>Sua lista está vazia :(</h1>}
      <div className={styles.list_movies}>
        {favoritesMovies.map((movie) => (
          <article key={movie.id}>
            <strong>{movie.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
            <Link to={`/movie/${movie.id}`}>Acessar</Link>
            <button onClick={() => deleteFavoriteMovie(movie.id)}>Excluir</button>
          </article>
        ))}
      </div>
    </div>
  )
}
