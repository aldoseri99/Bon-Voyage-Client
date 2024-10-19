import { Link } from "react-router-dom"

const Nav = () => {

  return (
    <header>
      <div>
        <Link to="/"> Bon-Voyage </Link>
        <Link to="/">Home</Link>
      </div>
    </header>
  )
}

export default Nav