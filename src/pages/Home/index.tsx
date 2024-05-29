import { useEffect } from "react"
import api from "../../services/api"

export default function Home() {

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing?", {
        params: {
          api_key: import.meta.env.VITE_KEY_API,
          language: "pt-BR"
        }
      })
      console.log(response.data.results)
    }

    loadMovies()

  }, [])
  
  return (
    <div>
      <h1>Bem vindo a Home</h1>
    </div>
  )
}
