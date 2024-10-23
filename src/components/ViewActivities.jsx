import { useEffect, useState } from "react"

const ViewActivities = ({ post, activitieId, onClose }) => {
  const [activitieDetails, setActivitieDetails] = useState(null)

  useEffect(() => {
    if (post) {
      const selected = post.activities.find(
        (activity) => activity._id === activitieId
      )
      setActivitieDetails(selected || null)
    }
  }, [post, activitieId])

  return activitieDetails ? (
    <div className="activity-details">
      <div className="activity-info">
        <div className="activity-name">
          <h2>{activitieDetails.name}</h2>
          <h4>{activitieDetails.place}</h4>
          <h4> Activity Cost: {activitieDetails.cost} BD</h4>
          <h4>
            {activitieDetails.rate} <i className="fa-solid fa-star"></i>
          </h4>
        </div>
        <div className="activity-photos">
          {activitieDetails.photos.map((photo, index) => (
            <img
              key={index}
              src={`http://localhost:3001/Activities/${photo}`}
              alt={`${activitieDetails.name} image ${index + 1}`}
              className="activity-photo"
            />
          ))}
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default ViewActivities
