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
import SearchResults from "./pages/SearchResults"
import FollowingsPage from "./pages/FollowingsPage"
import HighRatedPostsMap from "./pages/HighRatedMap"

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
      {user ? (
        <>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
          <br />
          <Link to="/editprofile">EditProfile</Link>
          <br />
          <Link to={`/ViewUser/${user.id}`}>View User</Link>
          <br />
          <Link to={"/high-rated-posts"}> Map </Link>
        </>
      ) : (
        <>
          <Link to="/register"> Register</Link>
          <br />
          <Link to="/signin"> Sign In</Link>
        </>
      )}

      <hr />
      {user ? (
        <Link to={"/add"}>
          <button className="floating-button">+</button>
        </Link>
      ) : null}

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

        <Route path="/high-rated-posts" element={<HighRatedPostsMap />} />

        <Route
          path="/followings/:userId"
          element={<FollowingsPage user={user} />}
        />
      </Routes>
    </>
  )
}

export default App
