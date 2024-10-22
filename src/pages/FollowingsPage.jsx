import { useParams } from 'react-router-dom'
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
    <div>
      <table>
        <tbody>
          {followUsers
            ? followUsers.map((follow) => (
                <tr key={follow._id}>
                  <td>
                    <img
                      className="user-profile-pic-large"
                      src={`http://localhost:3001/profilePics/${follow.profilePic}`}
                      alt=""
                    />
                  </td>
                  <td>{follow.username}</td>
                  <td>
                    {user ? (
                      <FollowButton user={user} account={follow} />
                    ) : null}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}
export default FollowingsPage
