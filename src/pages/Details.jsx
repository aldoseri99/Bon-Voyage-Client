import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PostDetail } from "../services/postServices"
import ViewActivities from "../components/ViewActivities"
import AddActivities from "../components/AddActivities"
import Map from "../components/Map"
import { useNavigate } from "react-router-dom"

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
            `http://localhost:3001/location/${encodeURIComponent(
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
            lon: parseFloat(locationData.longitude),
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
      activities: [...prevPost.activities, newActivity],
    }))
    navigate(`/details/${postId}`)
  }

  const handleActivityDelete = async (postId, activityId) => {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(
        `http://localhost:3001/activities/${activityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete activity")
      }

      // Update the single post state
      setPost((prevPost) => ({
        ...prevPost,
        activities: prevPost.activities.filter(
          (activity) => activity._id !== activityId
        ),
      }))
    } catch (error) {
      console.error("Error deleting activity:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const isPostOwner = post && post.User && post.User.toString() === user?.id

  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <img
            src={`http://localhost:3001/uploadPost/${post.photos}`}
            alt={post.title}
          />
          <p>Review: {post.review}</p>
          <p>Cost: {post.cost}</p>
          <p>Rating: {post.rate}</p>
          <p>Weather: {post.weather}</p>
          <p>Temperature: {post.temperature}</p>
          <p>Date: {post.date}</p>
          <div className="post-country">
            <h3>{post.country}</h3>
            {coordinates && (
              <Map coordinates={coordinates} id={`map-${post._id}`} />
            )}
          </div>
          <p>Environment: {post.environment}</p>
          <p>Likes: {post.likes}</p>
          <table>
            <thead>
              <tr>
                <th>Place</th>
                <th>Name</th>
                <th>Image</th>
                <th>Cost</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {post.activities &&
                post.activities.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.place}</td>
                    <td>{activity.name}</td>
                    <td>
                      <img
                        className="activity-img"
                        src={`http://localhost:3001/uploadPost/${activity.photos}`}
                        alt={activity.name}
                      />
                    </td>
                    <td>{activity.cost}</td>
                    <td>{activity.rate}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="activities">
            <h4>Activities:</h4>

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
                    {isPostOwner && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleActivityDelete(post._id, activity._id)
                        }}
                      >
                        Delete Activity
                      </button>
                    )}
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

            {isPostOwner && (
              <>
                <button onClick={() => setIsAddingActivity((prev) => !prev)}>
                  {isAddingActivity ? "Cancel" : "Add Activity"}
                </button>
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
        </div>
      )}
    </div>
  )
}

export default Details
