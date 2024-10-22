import { useState, useEffect } from 'react'
import { GetFollowings, ToggleFollow } from '../services/Auth'

const FollowButton = ({ user, account }) => {
  if (account) {
    const [isFollowed, setIsFollowed] = useState(false)
    const [followedUsers, setFollowedUsers] = useState([])

    useEffect(() => {
      const fetchFollowings = async () => {
        try {
          const res = await GetFollowings(user.id)
          setFollowedUsers(res) // Assuming `res` is an array of followed user objects
        } catch (error) {
          console.error('Error fetching followings:', error)
        }
      }
      fetchFollowings()
    }, [user])

    useEffect(() => {
      if (followedUsers && followedUsers.length > 0) {
        const postIsFollowed = followedUsers.some(
          (follow) => follow._id === account._id
        )
        setIsFollowed(postIsFollowed)
      }
    }, [followedUsers, account._id]) // Added account as a dependency to re-evaluate when it changes

    const handleFollowToggle = async () => {
      try {
        await ToggleFollow(user.id, account._id)
        setIsFollowed(!isFollowed)
      } catch (error) {
        console.error('Error toggling follow status:', error)
      }
    }

    return (
      <div>
        <button onClick={handleFollowToggle}>
          {isFollowed ? 'Unfollow' : 'Follow'} {/* Corrected button text */}
        </button>
      </div>
    )
  }
}

export default FollowButton
