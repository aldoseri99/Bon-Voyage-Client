import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Nav = () => {
  const [searchQuery, setSearchQuery] = useState()
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
  return (
    <header>
      
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
    </header>
  )
}

export default Nav
