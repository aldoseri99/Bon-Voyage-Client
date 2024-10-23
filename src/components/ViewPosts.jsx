<<<<<<< HEAD
import { useState, useEffect } from "react"
import { GetPost } from "../services/postServices"
import { Link } from "react-router-dom"
import Comment from "./Comment"
import ViewActivities from "./ViewActivities"
import AddActivities from "./AddActivities"
import { useNavigate } from "react-router-dom"

const ViewPosts = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [activities, setActivities] = useState([])
  const [selectedActivityId, setSelectedActivityId] = useState(null)
  const [isViewingActivity, setIsViewingActivity] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(null) // Track the current post ID
  const navigate = useNavigate()
=======
import { useState, useEffect } from 'react'
import { GetPost } from '../services/postServices'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import BookmarkButton from './BookmarkButton'

const ViewPosts = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedWeather, setSelectedWeather] = useState(null)
  const [selectedEnvironment, setSelectedEnvironment] = useState(null)
  const [selectedRating, setSelectedRating] = useState(null)
  const [sortOption, setSortOption] = useState('none')
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228

  useEffect(() => {
    const handlePosts = async () => {
      try {
        const data = await GetPost()
        setPosts(data || [])
      } catch (error) {
<<<<<<< HEAD
        console.error("Error fetching posts:", error)
=======
        console.error('Error fetching posts:', error)
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
      }
    }

    handlePosts()
  }, [])

  const handleLikeToggle = async (postId) => {
    if (!user || !user.id) {
<<<<<<< HEAD
      console.error("User is not defined or missing an ID.")
=======
      console.error('User is not defined or missing an ID.')
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3001/Posts/like/${postId}`,
        {
<<<<<<< HEAD
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
=======
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: user.id })
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
        }
      )

      if (response.ok) {
        const updatedPost = await response.json()
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? updatedPost : post))
        )
      } else {
<<<<<<< HEAD
        console.error("Failed to update like count:", response.statusText)
      }
    } catch (error) {
      console.error("Error updating like count:", error)
=======
        console.error('Failed to update like count:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating like count:', error)
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
    }
  }

  const handleCommentAdded = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
<<<<<<< HEAD
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
=======
          ? { ...post, comments: [...post.comments, newComment] }
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
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

<<<<<<< HEAD
  const handleActivityClick = (postId, activityId) => {
    setCurrentPostId(postId) // Set the current post ID
    setSelectedActivityId(activityId)
    setIsViewingActivity(true)
  }

  const handleClose = () => {
    setIsViewingActivity(false)
    setSelectedActivityId(null)
    setCurrentPostId(null) // Reset current post ID
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

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${postId}`, {
        method: "DELETE",
=======
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${postId}`, {
        method: 'DELETE'
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
      })

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
      } else {
<<<<<<< HEAD
        console.error("Failed to delete post:", response.statusText)
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const hasLiked = (post) => {
    return user && user.id && post.likedBy && post.likedBy.includes(user.id)
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>
=======
        console.error('Failed to delete post:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
  }

  const hasLiked = (post) => {
    return user && user.id && post.likedBy && post.likedBy.includes(user.id)
  }

  const handleWeatherFilter = (weatherCondition) => {
    setSelectedWeather(weatherCondition)
  }

  const handleEnvironmentFilter = (environmentCondition) => {
    setSelectedEnvironment(environmentCondition)
  }

  const handleRatingFilter = (ratingCondition) => {
    setSelectedRating(ratingCondition)
  }

  const getFilteredSortedPosts = () => {
    let filtered = [...posts]

    if (selectedWeather) {
      filtered = filtered.filter((post) => post.weather === selectedWeather)
    }

    if (selectedEnvironment) {
      filtered = filtered.filter(
        (post) => post.environment === selectedEnvironment
      )
    }

    if (selectedRating) {
      filtered = filtered.filter((post) => post.rate >= selectedRating)
    }

    return filtered
  }

  const filteredPosts = getFilteredSortedPosts()

  return (
<<<<<<< HEAD
    <div>
      {posts.map((post) => (
        <div key={post._id} className="post-inner">
          <div className="post-user">
            {post.User && (
              <>
                <img
                  src={`http://localhost:3001/profilePics/${post.User.profilePic}`}
                  alt={`${post.User.username}'s profile`}
                  className="user-profile-pic"
                />
=======
    <div className="full-page">
      <div>
        <button onClick={() => setShowFilters((prev) => !prev)}>
          {showFilters ? "Hide Filters" : <i className="fas fa-filter"></i>}

        </button>

        {showFilters && (
          <>
            <h3>Filter by Weather</h3>
            <select onChange={(e) => handleWeatherFilter(e.target.value)}>
              <option value="">Show All</option>
              <option value="sunny">Sunny</option>
              <option value="cloudy">Cloudy</option>
              <option value="rainy">Rainy</option>
              <option value="snowy">Snowy</option>
              <option value="windy">Windy</option>
            </select>

            <h3>Filter by Environment</h3>
            <select onChange={(e) => handleEnvironmentFilter(e.target.value)}>
              <option value="">Show All</option>
              <option value="city">City</option>
              <option value="nature">Nature</option>
              <option value="beach">Beach</option>
              <option value="mountain">Mountain</option>
              <option value="desert">Desert</option>
            </select>

            <h3>Filter by Rating</h3>
            <select
              onChange={(e) => handleRatingFilter(Number(e.target.value))}
            >
              <option value="">Show All</option>
              <option value="2">2 Stars or Higher</option>
              <option value="3">3 Stars or Higher</option>
              <option value="4">4 Stars or Higher</option>
              <option value="5">5 Stars</option>
            </select>
          </>
        )}
      </div>

      <div className="post">
        {filteredPosts.map((post) => (
          <div key={post._id} className="post-inner">
            {post.User && (
              <div className="post-user">
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
                <Link to={`/ViewUser/${post.User._id}`}>
                  <img
                    src={`http://localhost:3001/profilePics/${post.User.profilePic}`}
                    alt={`${post.User.username}'s profile`}
                    className="user-profile-pic"
                  />
                </Link>
                <Link className="userLink" to={`/ViewUser/${post.User._id}`}>
                  <p className="username-post">{post.User.username}</p>
                </Link>
              </div>
            )}
<<<<<<< HEAD
          </div>
          <div className="main-post">
            <div className="post-img">
              {post.photos ? (
                <img
                  src={`http://localhost:3001/uploadPost/${post.photos}`}
                  alt="post photo"
                />
              ) : (
                <p>No Image Available</p>
              )}
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
              <h4>{post.like} Likes</h4>
            </div>
            <button onClick={() => handleLikeToggle(post._id)}>
              {hasLiked(post) ? "Remove Like" : "Like"}
            </button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
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
                  onClick={() => handleActivityClick(post._id, activity._id)} // Pass post ID and activity ID
                  style={{ cursor: "pointer" }}
                >
                  <h5>
                    {activity.name}{" "}
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Prevent the click event from bubbling up
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
                  post={post} // Pass the current post
                  activitieId={selectedActivityId}
                  onClose={handleClose}
=======
            <div className="post-main">
              <Link to={`/details/${post._id}`}>
                <img
                  className="post-img"
                  src={`http://localhost:3001/uploadPost/${post.photos}`}
                  alt="post photo"
>>>>>>> be2a1fecbf1655ac329b1f60340ff2f4ba796228
                />
              </Link>
              <div className="post-main-info">
                <Link to={`/details/${post._id}`}>
                  <h3>{post.title}</h3>
                </Link>
                <h3>
                  {post.rate}
                  <i class="fa-solid fa-star"></i>
                </h3>
              </div>
            </div>

            <div className="post-information">
              <div className="LikeComment">
                <button
                  className="post-like"
                  onClick={() => handleLikeToggle(post._id)}
                >
                  {hasLiked(post) ? (
                    <>
                      <i class="fa-solid fa-heart"></i>
                      <p>{post.like}</p>
                    </>
                  ) : (
                    <>
                      <i class="fa-regular fa-heart"></i>
                      <p>{post.like}</p>
                    </>
                  )}
                </button>
                <Link to={`/details/${post._id}`}>
                  <button>
                    <i class="fa-regular fa-comment fa-flip-horizontal"></i>
                    <p>{post.comments.length}</p>
                  </button>
                </Link>
              </div>
              <BookmarkButton user={user} post={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewPosts
