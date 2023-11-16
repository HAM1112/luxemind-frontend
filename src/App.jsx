import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Login from './pages/account/Login'




function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          {/* Admin Routes ..testing */}
          <Route path='/account/login' exact element={<Login />}></Route>
          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
