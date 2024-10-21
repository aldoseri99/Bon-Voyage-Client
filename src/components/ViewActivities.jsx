import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AddPost from "./AddPost"

const ViewActivities = ({ post }) => {
  let navigate = useNavigate()
  let { activitieId } = useParams()
  const [activitieDetails, setActivitieDetails] = useState(null)

  useEffect(() => {
    if (post.length > 0) {
      const selected = post.find((postItem) => postItem._id === activitieId)
      setActivitieDetails(selected || null)
    }
  }, [post, activitieId])



  return activitieDetails ? (
    <div>
      <div className="activitieDetails-img">
        <img
          src={`http://localhost:3001/uploads/${activitieDetails.photos}`}
          alt={activitieDetails.name}
        />
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
