import { useState, useEffect } from 'react'
import { GetPost } from '../services/postServices'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import ViewActivities from './ViewActivities'
import AddActivities from './AddActivities'
import { useNavigate } from 'react-router-dom'
import BookmarkButton from './BookmarkButton'

const ViewPosts = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [activities, setActivities] = useState([])

  const [currentPostId, setCurrentPostId] = useState(null) // Track the current post ID
  const navigate = useNavigate()

  useEffect(() => {
    const handlePosts = async () => {
      try {
        const data = await GetPost()
        setPosts(data || [])
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    handlePosts()
  }, [])

  const handleLikeToggle = async (postId) => {
    if (!user || !user.id) {
      console.error('User is not defined or missing an ID.')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3001/Posts/like/${postId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: user.id })
        }
      )

      if (response.ok) {
        const updatedPost = await response.json()
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? updatedPost : post))
        )
      } else {
        console.error('Failed to update like count:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating like count:', error)
    }
  }

  const handleCommentAdded = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    )
  }

  const handleCommentDeleted = (commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => ({
        ...post,
        comments: post.comments.filter((comment) => comment._id !== commentId)
      }))
    )
  }

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${postId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
      } else {
        console.error('Failed to delete post:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const hasLiked = (post) => {
    return user && user.id && post.likedBy && post.likedBy.includes(user.id)
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>
  }

  return (
    <div className="post">
      {posts.map((post) => {
        return (
          <div key={post._id} className="post-inner">
            <div className="post-user">
              {post.User && (
                <>
                  <img
                    src={`http://localhost:3001/profilePics/${post.User.profilePic}`}
                    alt={`${post.User.username}'s profile`}
                    className="user-profile-pic"
                  />
                  <span className="username">{post.User.username}</span>
                </>
              )}
              <BookmarkButton user={user} post={post} />
            </div>
            <div className="arrange">
            <div className="post-title">
              <h3 className="">{post.title}</h3>
            </div>
            <div className="post-img">
              <img className="the-post-img"
                src={`http://localhost:3001/uploadPost/${post.photos}`}
                alt="post photo"
              />
            </div>

            <div className="post-details">
            

            <div className="post-country">
              <h3>{post.country}</h3>
            </div>

            <div className="post-cost">
              <h3>{post.cost} BHD</h3>
            </div>

            <div className="post-rate">
              <h3>{post.rate}</h3>
            </div>
            </div>
            </div>

            <div className="post-like">
              <button onClick={() => handleLikeToggle(post._id)}>
                {hasLiked(post) ? (
                  <i
                    className="fa-solid fa-thumbs-up"
                    style={{ color: "#a0a0a0", marginRight: "5px" }}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-thumbs-up"
                    style={{ color: "#a0a0a0", marginRight: "5px" }}
                  ></i>
                )}
                {hasLiked(post) ? "" : ""}
                <h4>{post.like} Likes</h4>
              </button>
              
            </div>

            {/* <button onClick={() => handleDelete(post._id)}>Delete</button> */}

            <div className="post-commint">
              <Comment
                comments={post.comments}
                postId={post._id}
                onCommentAdded={(newComment) =>
                  handleCommentAdded(post._id, newComment)
                }
                onCommentDeleted={handleCommentDeleted}
              />
            </div>

            <div>
              <Link to={`/details/${post._id}`}>
                <button>Details</button>
              </Link>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ViewPosts
