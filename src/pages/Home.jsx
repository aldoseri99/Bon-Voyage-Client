import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../services/api"
import ViewPosts from "../components/ViewPosts"

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`)
        setPosts(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <ViewPosts posts={posts} />
    </div>
  )
}

export default Home
