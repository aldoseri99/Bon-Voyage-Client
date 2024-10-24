import { Link, useParams } from 'react-router-dom'
import { GetFollowings } from '../services/Auth'
import { useEffect, useState } from 'react'
import FollowButton from '../components/FollowButton'

const FollowingsPage = ({ user }) => {
  const userId = useParams()
  const [followUsers, setFollowUsers] = useState('')
  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const res = await GetFollowings(userId.userId)
        setFollowUsers(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFollowings()
  }, [userId])
  return (
    <div className="user-card-container">
      {followUsers
        ? followUsers.map((follow) => (
            <div className="user-card" key={follow._id}>
              <div>
                <Link className="table-link" to={`/ViewUser/${follow._id}`}>
                  <img
                    className="user-card-pic"
                    src={`https://bon-voyage.fly.dev/profilePics/${follow.profilePic}`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="username">
                <Link className="table-link" to={`/ViewUser/${follow._id}`}>
                  {follow.username}
                </Link>
                <p>{follow.followings.length} Following</p>
              </div>
              <div>
                {user ? <FollowButton user={user} account={follow} /> : null}
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
export default FollowingsPage
