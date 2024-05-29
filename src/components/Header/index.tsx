import { Link } from 'react-router-dom'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={"/"}>Prime Flix</Link>
      <Link className={styles.favoritos} to={"/favorites"}>Favoritos</Link>
    </header>
  )
}
