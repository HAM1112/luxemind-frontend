import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import './App.css'

import AuthForm from './pages/account/AuthForm'
import AdminHome from './pages/adminpanel/AdminHome'
import Dashboard from './pages/adminpanel/Dashboard'
import UsersList from './pages/adminpanel/UsersList'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import StudRegister from './pages/account/StudRegister'
import ProvRegister from './pages/account/ProvRegister'
import CheckAuth from './utilities/CheckAuth'
import Profile from './pages/adminpanel/Profile'




function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          {/* Admin Routes ..testing */}
          <Route path='/account' exact element={<AuthForm />}>
            <Route index element={<Navigate to='login' />} ></Route>
            <Route path='login' exact element={<CheckAuth role={"login"} name={'login'}><Login /></CheckAuth>}></Route>
            <Route path='register' exact element={<Register />}>
              <Route index element={<Navigate to='student' />} ></Route>
              <Route path='student' exact element={<StudRegister />}></Route>
              <Route path='provider' exact element={<ProvRegister />}></Route>
            </Route>

          </Route>

          <Route path='/admin' exact element={<CheckAuth><AdminHome/></CheckAuth>}>

            <Route index element={<Navigate to='dashboard' />} ></Route>
            <Route path='dashboard' exact element={<Dashboard />}></Route>
            <Route path='users' exact element={<UsersList />}></Route>
            <Route path='profile' exact element={<Profile />}></Route>

          </Route>
          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
