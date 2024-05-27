import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movie/:id' element={<Movie/>} />
      </Routes>
    </BrowserRouter>
  )
}
