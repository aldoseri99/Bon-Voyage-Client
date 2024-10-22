import { useState, useEffect } from "react"
import { GetPost } from "../services/postServices"
import { Link } from "react-router-dom"
import Comment from "./Comment"
import ViewActivities from "./ViewActivities"
import AddActivities from "./AddActivities"
import { useNavigate } from "react-router-dom"

const ViewPosts = () => {
  const [posts, setPosts] = useState([])
  const [activities, setActivities] = useState([])
  const [selectedActivityId, setSelectedActivityId] = useState(null)
  const [isViewingActivity, setIsViewingActivity] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(null)

  const navigate = useNavigate()

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
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    )
  }

  const handleCommentDeleted = (commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => ({
        ...post,
        comments: post.comments.filter((comment) => comment._id !== commentId),
      }))
    )
  }

  const handleActivityClick = (postId, activityId) => {
    setCurrentPostId(postId)
    setSelectedActivityId(activityId)
    setIsViewingActivity(true)
  }

  const handleClose = () => {
    setIsViewingActivity(false)
    setSelectedActivityId(null)
    setCurrentPostId(null)
  }

  const handleActivityAdd = async (postId, newActivity) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, activities: [...post.activities, newActivity] }
          : post
      )
    )
  }

  const handleActivityDelete = async (postId, activityId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/activities/${activityId}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete activity")
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                activities: post.activities.filter(
                  (activity) => activity._id !== activityId
                ),
              }
            : post
        )
      )
    } catch (error) {
      console.error("Error deleting activity:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))
        navigate("/")
      } else {
        console.error("Failed to delete the post:", response.statusText)
      }
    } catch (error) {
      console.error("Error can't delete the post:", error)
    }
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
            </div>

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

            <Comment
              comments={post.comments}
              postId={post._id}
              onCommentAdded={(newComment) =>
                handleCommentAdded(post._id, newComment)
              }
              onCommentDeleted={handleCommentDeleted}
            />

            <div className="activities">
              <h4>Activities:</h4>

              <AddActivities
                postId={post._id}
                activities={post.activities}
                onActivityAdded={handleActivityAdd}
              />

              {post.activities.length === 0 ? (
                <p>No Activities</p>
              ) : (
                post.activities.map((activity) => (
                  <div
                    key={activity._id}
                    onClick={() => handleActivityClick(post._id, activity._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <h5>
                      {activity.name}{" "}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleActivityDelete(post._id, activity._id)
                        }}
                      >
                        Delete Activity
                      </button>
                    </h5>
                  </div>
                ))
              )}

              {isViewingActivity &&
                selectedActivityId &&
                currentPostId === post._id && (
                  <ViewActivities
                    post={post}
                    activitieId={selectedActivityId}
                    onClose={handleClose}
                  />
                )}
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
