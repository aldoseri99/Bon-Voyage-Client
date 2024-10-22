import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PostDetail } from "../services/postServices"
import Map from "../components/Map"

const Details = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

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
          {post.comments &&
            post.comments.map((comment, index) => (
              <div key={index}>
                <h4>{comment.title}</h4>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Details
