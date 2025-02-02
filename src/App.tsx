import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Login from './auth/page/Login'
import Config from './pages/Config'
import './App.css'
import PrivateRoute from './auth/page/PrivateRoute'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/login' element={<Login /> } />
        <Route element={<PrivateRoute />}>
          <Route path='/configurations' element={<Config />} />
        </Route>
      </Routes>
    </Router>

  )
}

export default App
