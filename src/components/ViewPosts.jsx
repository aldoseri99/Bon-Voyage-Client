
import { useState, useEffect } from "react"
import { GetPost } from "../services/postServices"

const ViewPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const handlePosts = async () => {
      const data = await GetPost()
      setPosts(data || [])
    }

    handlePosts()
  }, [])

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>
  }

  return (
    <div>
      {posts.map(() => (
        <div key={post.id}>
          <div className="post-img">
            <img
              src={`http://localhost:3001/upload/${post.photo}`}
              alt="post photo"
            />
          </div>

          <div className="post-title">
            <h3>{post.title}</h3>
          </div>

          <div className="post-country">
            <h3>{post.country}</h3>
          </div>

          <div className="post-cost">
            <h3>{post.cost}</h3>
          </div>

          <div className="post-rate">
            <h3>{post.rate}</h3>
          </div>

          <div className="post-like">
            <h4>{post.like}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ViewPosts
