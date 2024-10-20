import { useState, useEffect } from "react"
import { GetPost } from "../services/postServices"
import Comment from "./Comment"

const ViewPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const handlePosts = async () => {
      const data = await GetPost()
      setPosts(data || [])
    }

    handlePosts()
  }, [])

  const handleCommentAdded = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post
      )
    )
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="post-img">
            <img
              src={`http://localhost:3001/upload/${post.photos}`}
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

          <Comment
            comments={post.comments}
            postId={post._id}
            onCommentAdded={(newComment) =>
              handleCommentAdded(post._id, newComment)
            }
          />

          <hr />
        </div>
      ))}
    </div>
  )
}

export default ViewPosts
