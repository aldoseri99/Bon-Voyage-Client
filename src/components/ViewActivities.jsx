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
      <button onClick={onClose}>Close</button>
      <div className="activitieDetails-photos">
        {activitieDetails.photos.map((photo, index) => (
          <img
            key={index}
            src={`http://localhost:3001/uploadPost/${photo}`}
            alt={`${activitieDetails.name} image ${index + 1}`}
            style={{ width: "100px", height: "100px", margin: "5px" }}
          />
        ))}
      </div>
      <div className="activitieDetails-name">
        <h3>{activitieDetails.name}</h3>
      </div>
      <div className="activitieDetails-place">
        <h3>{activitieDetails.place}</h3>
      </div>
      <div className="activitieDetails-cost">
        <h5>{activitieDetails.cost}</h5>
      </div>
      <div>
        <h6>{activitieDetails.rate}</h6>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default ViewActivities
