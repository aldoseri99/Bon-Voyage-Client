import React, { useEffect, useState } from "react"
import PostMap from "../components/PostMap"
import { useNavigate } from "react-router-dom"
import { GetPost } from "../services/postServices"

const HighRatedMap = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const handlePosts = async () => {
      try {
        const data = await GetPost() // Fetch all posts

        // Filter posts with a rate greater than 4
        const highRatedPosts = data.filter((post) => post.rate >= 4)

        // Fetch coordinates for each high-rated post
        const postsWithCoordinates = await Promise.all(
          highRatedPosts.map(async (post) => {
            if (post.country) {
              const coordResponse = await fetch(
                `http://localhost:3001/location/${encodeURIComponent(
                  post.country
                )}`
              )

              if (!coordResponse.ok) {
                throw new Error(
                  `Error fetching coordinates: ${await coordResponse.text()}`
                )
              }

              const locationData = await coordResponse.json()

              return {
                ...post,
                coordinates: {
                  lat: parseFloat(locationData.latitude),
                  lon: parseFloat(locationData.longitude),
                },
              }
            }
            return post // Return post without coordinates if country is not present
          })
        )

        setPosts(postsWithCoordinates)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    handlePosts()
  }, [])

  const handlePostClick = (post) => {
    navigate(`/details/${post._id}`)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>High Rated Posts</h2>
      <PostMap posts={posts} onPostClick={handlePostClick} />
      {selectedPost && (
        <div>
          <h3>Post Details</h3>
          <p>Title: {selectedPost.title}</p>
          <p>Rating: {selectedPost.rate}</p>
          <p>Country: {selectedPost.country}</p>
        </div>
      )}
    </div>
  )
}

export default HighRatedMap
