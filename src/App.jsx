import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  // const checkToken = async () => {
  //   const user = await CheckSession()
  //   setUser(user)
  // }
  //
  // useEffect(() => {
  //   const token = localStorage.getItem('token')

  //   if (token) {
  //     checkToken()
  //   }
  // }, [])
  return (
    <>
      <Link to="/"> Home</Link>
      <br />
      <Link to="/register"> Register</Link>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
