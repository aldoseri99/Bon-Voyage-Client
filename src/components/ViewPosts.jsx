
import { useState, useEffect } from "react";
import { GetPost } from "../services/postServices";
import { useNavigate } from "react-router-dom";


const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePosts = async () => {
      const data = await GetPost();
      setPosts(data || [])
    };

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${id}`, { method: "DELETE" })

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        navigate("/");
      } else {
        console.error("Failed to delete the post:", response.statusText)
      }
    } catch (error) {
      console.error("Error can't delete the post:", error)
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
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
            <h3>{post.cost} BHD</h3>
          </div>

          <div className="post-rate">
            <h3>{post.rate}</h3>
          </div>

          <div className="post-like">
            <h4>{post.like}</h4>
          </div>


          <button onClick={() => handleDelete(post._id)}>Delete</button>

        </div>
      ))}
    </div>
  )
}

export default ViewPosts
