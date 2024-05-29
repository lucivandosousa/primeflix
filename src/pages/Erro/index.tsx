import { Link } from "react-router-dom"
import styles from "./erro.module.css"

export default function Erro() {
  return (
    <div className={styles.not_found}>
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link className={styles.link} to={"/"}>Veja todos os filmes!</Link>
    </div>
  )
}
