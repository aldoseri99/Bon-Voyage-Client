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
import EditProfile from "./pages/EditProfile"
import ViewActivities from "./components/ViewActivities"
import AddPost from "./components/AddPost"
import ViewUser from "./components/ViewUser"
import SearchResults from './pages/SearchResults'


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
    <div className="nav-bar">
      <Link to="/"> Home</Link>
      <Nav />
      <br />
      {user ? (
        <>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
          
          <br />
          <Link to="/editprofile">EditProfile</Link>
          <br />
          <Link to={`/ViewUser/${user.id}`}>View User</Link>
          
        </>
    
      ) : (
        <>
          <Link to="/register"> Register</Link>
          <br />
          <Link to="/signin"> Sign In</Link>
        </>
        
      )}
      </div> 
      <hr />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/details/:id" element={<Details user={user} />} />
        <Route
          path="/editprofile"
          element={<EditProfile user={user} setUser={setUser} />}
        />
        <Route path="/activities/:activitieId" element={<ViewActivities />} />
        <Route path="/ViewUser/:userId" element={<ViewUser user={user} />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </>
  )
}

export default App
