import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import ViewPosts from '../components/ViewPosts'
import Comment from '../components/Comment'
import UserList from '../components/UserList'
import ViewFollowPosts from '../components/ViewFollowPosts'

const Home = ({ user, setUser }) => {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  const [tab, setTab] = useState(true)

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
  const handleTabs = () => {
    setTab(!tab)
  }
  return (
    <div>
      <UserList user={user} setUser={setUser} />
      {tab ? (
        <>
          <button onClick={handleTabs}>All</button>
          <ViewPosts user={user} posts={posts} />
        </>
      ) : (
        <>
          <button onClick={handleTabs}>Followings</button>
          <ViewFollowPosts user={user} />
        </>
      )}
    </div>
  )
}

export default Home
