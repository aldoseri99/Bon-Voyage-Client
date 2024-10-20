import { useState, useEffect } from "react"
import { GetPost } from "../services/postServices"
import { Link } from "react-router-dom"
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

  const handleCommentDeleted = (commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        return {
          ...post,
          comments: post.comments.filter(
            (comment) => comment._id !== commentId
          ),
        }
      })
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
              src={`http://localhost:3001/uploadPost/${post.photos}`}
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
            <h3>{post.cost}BHD</h3>
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
            onCommentDeleted={handleCommentDeleted}
          />

          <div>
            <Link to={`/details/${post._id}`}>
              <button>Details</button>
            </Link>
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default ViewPosts
