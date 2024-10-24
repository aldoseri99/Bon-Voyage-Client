import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PostDetail } from '../services/postServices'
import ViewActivities from '../components/ViewActivities'
import AddActivities from '../components/AddActivities'
import Map from '../components/Map'
import { useNavigate } from 'react-router-dom'
import Comment from '../components/Comment'

const Details = ({ user }) => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedActivityId, setSelectedActivityId] = useState(null)
  const [isViewingActivity, setIsViewingActivity] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(null)
  const [isAddingActivity, setIsAddingActivity] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const response = await PostDetail(id)
        setPost(response)

        if (response.country) {
          const coordResponse = await fetch(
            `https://bon-voyage.fly.dev/location/${encodeURIComponent(
              response.country
            )}`
          )

          if (!coordResponse.ok) {
            throw new Error(
              `Error fetching coordinates: ${await coordResponse.text()}`
            )
          }

          const locationData = await coordResponse.json()
          setCoordinates({
            lat: parseFloat(locationData.latitude),
            lon: parseFloat(locationData.longitude)
          })
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getPostDetails()
  }, [id])

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
    setPost((prevPost) => ({
      ...prevPost,
      activities: [...prevPost.activities, newActivity]
    }))
    navigate(`/details/${postId}`)
  }

  const handleActivityDelete = async (postId, activityId) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        `https://bon-voyage.fly.dev/activities/${activityId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete activity')
      }

      // Update the single post state
      setPost((prevPost) => ({
        ...prevPost,
        activities: prevPost.activities.filter(
          (activity) => activity._id !== activityId
        )
      }))
    } catch (error) {
      console.error('Error deleting activity:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const isPostOwner = post && post.User && post.User._id === user?.id

  const handleCommentAdded = (postId, newComment) => {
    setPost(() =>
      post._id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    )
  }

  const handleCommentDeleted = (commentId) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments.filter((comment) => comment._id !== commentId)
    }))
  }

  return (
    <div className="background-color">
      {post && (
        <div>
          <div className="post-details">
            <div className="detail-profile">
              <Link to={`/ViewUser/${post.User._id}`}>
                <img
                  src={`https://bon-voyage.fly.dev/profilePics/${post.User.profilePic}`}
                  alt=""
                  className="user-profile-pic-large"
                />
              </Link>
              <Link to={`/ViewUser/${post.User._id}`}>
                <h2>{post.User.username}</h2>
              </Link>
            </div>
            <hr />
            <div className="detail-header">
              <div className="detail-title">
                <h1>{post.title}</h1>
                <small className="detail-date">
                  {new Date(post.date).toLocaleDateString()}
                </small>
              </div>
              <div className="detail-stats">
                <p>
                  {post.rate} <i className="fa-solid fa-star"></i>
                </p>
                <p>{post.temperature} °C</p>
              </div>
            </div>

            <div className="image-map-container">
              <img
                className="post-image"
                src={`https://bon-voyage.fly.dev/uploadPost/${post.photos}`}
                alt={post.title}
              />
              <div className="post-country">
                {coordinates && (
                  <Map coordinates={coordinates} id={`map-${post._id}`} />
                )}
              </div>
            </div>

            <div className="detail-info">
              <div className="review-section">
                <p>{post.review}</p>
                <p>Trip Cost: {post.cost} BD</p>
              </div>
              <div className="info-section">
                <p>
                  {post.weather === 'sunny' && (
                    <img
                      src="/weather/sunny.png"
                      alt="Sunny Icon"
                      className="icon"
                    />
                  )}
                  {post.weather === 'cloudy' && (
                    <img
                      src="/weather/cloudy.png"
                      alt="cloudy Icon"
                      className="icon"
                    />
                  )}
                  {post.weather === 'rainy' && (
                    <img
                      src="/weather/rainy.png"
                      alt="rainy Icon"
                      className="icon"
                    />
                  )}
                  {post.weather === 'windy' && (
                    <img
                      src="/weather/windy.png"
                      alt="windy Icon"
                      className="icon"
                    />
                  )}
                  {post.weather === 'snowy' && (
                    <img
                      src="/weather/snowy.png"
                      alt="snowy Icon"
                      className="icon"
                    />
                  )}
                </p>
                <p>
                  {post.environment === 'beach' && (
                    <img
                      src="/environment/beach.png"
                      alt="beach Icon"
                      className="icon"
                    />
                  )}
                  {post.environment === 'city' && (
                    <img
                      src="/environment/city.png"
                      alt="city Icon"
                      className="icon"
                    />
                  )}
                  {post.environment === 'desert' && (
                    <img
                      src="/environment/desert.png"
                      alt="desert Icon"
                      className="icon"
                    />
                  )}
                  {post.environment === 'mountain' && (
                    <img
                      src="/environment/mountain.png"
                      alt="mountain Icon"
                      className="icon"
                    />
                  )}
                  {post.environment === 'nature' && (
                    <img
                      src="/environment/nature.png"
                      alt="nature Icon"
                      className="icon"
                    />
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="activities">
            <div className="activities-header">
              <h2>Activities:</h2>
              {isPostOwner ? (
                <button
                  className="add-activity"
                  onClick={() => setIsAddingActivity((prev) => !prev)}
                >
                  {isAddingActivity ? 'Cancel' : '+'}
                </button>
              ) : null}
            </div>
            <hr />
            {post.activities.length === 0 ? (
              <p>No Activities</p>
            ) : (
              post.activities.map((activity) => (
                <div
                  className="activity-item"
                  key={activity._id}
                  onClick={() => handleActivityClick(post._id, activity._id)}
                >
                  <h2 className="activity-name">{activity.name}</h2>

                  {isPostOwner && (
                    <button
                      className="delete-activity"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering the activity click
                        handleActivityDelete(post._id, activity._id)
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>{' '}
                    </button>
                  )}
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

            {isPostOwner && (
              <>
                {isAddingActivity && (
                  <AddActivities
                    postId={post._id}
                    activities={post.activities}
                    onActivityAdded={handleActivityAdd}
                  />
                )}
              </>
            )}
          </div>
          <div className="post-comment">
            <Comment
              comments={post.comments}
              postId={post._id}
              onCommentAdded={(newComment) =>
                handleCommentAdded(post._id, newComment)
              }
              onCommentDeleted={handleCommentDeleted}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
