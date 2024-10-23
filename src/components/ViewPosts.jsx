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
    <>
    <div>
    <button onClick={() => setShowFilters((prev) => !prev)}>
      {showFilters ? 'Hide Filters' : 'Show Filters'}
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
        <select onChange={(e) => handleRatingFilter(Number(e.target.value))}>
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
            <div className="post-user">
              {post.User && (
                <>
                  <img
                    src={`http://localhost:3001/profilePics/${post.User.profilePic}`}
                    alt={`${post.User.username}'s profile`}
                    className="user-profile-pic"
                  />
                  <Link to={`/ViewUser/${post.User._id}`}>
                    <span className="username">{post.User.username}</span>
                  </Link>
                </>
              )}
              <BookmarkButton user={user} post={post} />
            </div>
            <div className="arrange">
              <div className="post-title">
                <h3>{post.title}</h3>
              </div>
              <div className="post-img">
                <img
                  className="the-post-img"
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
                    style={{ color: '#a0a0a0', marginRight: '5px' }}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-thumbs-up"
                    style={{ color: '#a0a0a0', marginRight: '5px' }}
                  ></i>
                )}
                <h4>{post.like} Likes</h4>
              </button>
            </div>

            <div className="post-comment">
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
        ))}
      </div>
    </>
  )
}

export default ViewPosts
