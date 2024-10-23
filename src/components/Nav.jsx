import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`)
    }
  }

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev)
  }

  const closeDropdown = () => {
    setDropdownVisible(false)
  }

  return (
    <header className="nav-header">
      <div className="logo-container">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>

      <nav className="nav-links-container">
        <ul className="nav-links">
          {user ? (
            <>
              <li>
                <Link to="/high-rated-posts">Map</Link>
                <Link to="/FAQs"> FAQs</Link>
              </li>
              <li>
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    placeholder="Search user..."
                    value={searchQuery}
                    onChange={handleChange}
                  />
                  <button type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>{" "}
                  </button>
                </form>
              </li>
              <li className="user-dropdown">
                <img
                  src={`http://localhost:3001/profilePics/${user.profilePic}`}
                  alt="User"
                  className="user-profile-pic"
                  onClick={toggleDropdown}
                />
                {dropdownVisible && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={`/ViewUser/${user.id}`} onClick={closeDropdown}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/editprofile">Edit Profile</Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={() => {
                          handleLogOut()
                          closeDropdown()
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/FAQs"> FAQs</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Nav
