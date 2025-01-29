import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import InventoryHandlerPage from './pages/InventoryHandlerPage'
import LoginPage from './auth/page/loginPage'
import './App.css'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/login' element={<LoginPage /> } />
        <Route path='/inventory' element={<InventoryHandlerPage/>} />
      </Routes>
    </Router>

  )
}

export default App
