import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Link } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import "./App.css"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import Details from "./pages/Details"
import ViewActivities from "./components/ViewActivities"
import AddPost from "./components/AddPost"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      checkToken()
    }
  }, [])
  return (
    <>
      <Nav />
      <Link to="/"> Home</Link>
      <br />
      <Link to="/register"> Register</Link>
      <br />
      {user ? (
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      ) : (
        <Link to="/signin"> Sign In</Link>
      )}
      <hr />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/add" element={<AddPost />} />      
        <Route path="/details/:id" element={<Details />} />
        <Route path="/activities/:activitieId" element={<ViewActivities />} />
      </Routes>
    </>
  )
}

export default App
