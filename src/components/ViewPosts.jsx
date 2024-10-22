import { useState, useEffect } from 'react'
import { GetPost } from '../services/postServices'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import BookmarkButton from './BookmarkButton'
import { useNavigate } from 'react-router-dom'

const ViewPosts = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  const [selectedWeather, setSelectedWeather] = useState(null)
  const [sortOption, setSortOption] = useState('none')
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    const handlePosts = async () => {
      try {
        const data = await GetPost()
        setPosts(data || [])
        setFilteredPosts(data)
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
          prevPosts.map((post) =>
            post._id === postId ? { ...post, ...updatedPost } : post
          )
        )
  
        setFilteredPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, ...updatedPost } : post
          )
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
  
    setFilteredPosts((prevPosts) =>
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

  const handleFilter = (weatherCondition) => {
    if (weatherCondition === null) {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter((post) => post.weather === weatherCondition)
      setFilteredPosts(filtered)
    }
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const getSortedFilteredPosts = () => {
    let sortedPosts = [...filteredPosts]

    if (sortOption === 'none') return sortedPosts

    sortedPosts.sort((a, b) => {
      if (sortOption === 'weather_asc') {
        return a.weather.localeCompare(b.weather)
      }
      return 0
    })

    return sortedPosts
  }

  const toggleFilterVisibility = () => {
    setShowFilter(!showFilter)
  }

  return (
    <>
      <button onClick={toggleFilterVisibility}>
        {showFilter ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilter && (
        <>
          <h2>Filter by Weather</h2>
          <div>
            <button onClick={() => handleFilter(null)}>Show All</button>
            <button onClick={() => handleFilter('sunny')}>Sunny</button>
            <button onClick={() => handleFilter('cloudy')}>Cloudy</button>
            <button onClick={() => handleFilter('rainy')}>Rainy</button>
            <button onClick={() => handleFilter('snowy')}>Snowy</button>
            <button onClick={() => handleFilter('windy')}>Windy</button>
          </div>

          <h2>Sort by</h2>
          <select onChange={handleSortChange} value={sortOption}>
            <option value="none">None</option>
            <option value="weather_asc">Weather Ascending</option>
          </select>
        </>
      )}

      <div className="post">
        {getSortedFilteredPosts().map((post) => (
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
        ))}
      </div>
    </>
  )
}

export default ViewPosts
