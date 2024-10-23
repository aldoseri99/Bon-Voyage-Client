import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import ViewPosts from '../components/ViewPosts'
import Comment from '../components/Comment'
import UserList from '../components/UserList'
import ViewFollowPosts from '../components/ViewFollowPosts'

const Home = ({ user, setUser }) => {
  const [posts, setPosts] = useState([])
  const [showFollowings, setShowFollowings] = useState(false) // false for "All", true for "Followings"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`)
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleToggle = () => {
    setShowFollowings((prev) => !prev) // Toggle the followings state
  }

  return (
    <div>
      {user ? (
        <div className="toggle-container">
          <span>All</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={showFollowings}
              onChange={handleToggle}
            />
            <span className="slider" />
          </label>
          <span>Following</span>
        </div>
      ) : null}
      {user && showFollowings ? (
        <ViewFollowPosts user={user} />
      ) : (
        <ViewPosts user={user} posts={posts} />
      )}
    </div>
  )
}

export default Home
