import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import InventoryHandlerPage from './pages/InventoryHandlerPage'
import Login from './pages/Login'
import './App.css'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/login' element={<Login /> } />
        <Route path='/inventory' element={<InventoryHandlerPage/>} />
      </Routes>
    </Router>

  )
}

export default App
