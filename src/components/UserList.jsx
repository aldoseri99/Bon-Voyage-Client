import { useEffect, useState } from 'react'
import { Follow, GetAllUsers } from '../services/Auth'
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton'

const UserList = ({ user, setUser }) => {
  if (user) {
    const [users, setUsers] = useState(null)

    useEffect(() => {
      const getUsers = async () => {
        try {
          const response = await GetAllUsers(user.id)
          console.log(response.users)
          setUsers(response.users)
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }
      getUsers()
    }, [])

    const handleFollow = async (id) => {
      try {
        const response = await Follow(user.id, [...user.followings, id])
        console.log(response.user.followings)
        setUser(response.user)
      } catch (error) {
        console.error('Error following user:', error)
      }
    }
    const handleUnfollow = async (id) => {
      try {
        const newArray = user.followings.filter(
          (followingId) => followingId !== id
        )
        const response = await Follow(user.id, newArray)
        console.log(response.user.followings)
        setUser(response.user)
      } catch (error) {
        console.error('Error following user:', error)
      }
    }

    return (
      <div>
        {users
          ? users.map((account) => (
              <div className="user-list" key={account._id}>
                <img
                  className="profilePics"
                  src={`http://localhost:3001/profilePics/${account.profilePic}`}
                  alt="post photo"
                />
                <Link to={`/ViewUser/${account._id}`}>
                  <h3>{account.username}</h3>
                </Link>
                <FollowButton user={user} account={account} />
              </div>
            ))
          : null}
      </div>
    )
  }
}

export default UserList
