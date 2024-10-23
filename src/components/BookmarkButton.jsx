import { useState, useEffect } from 'react'
import { GetBookmarked, ToggleBookmark } from '../services/postServices'

const BookmarkButton = ({ user, post }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        const res = await GetBookmarked(user.id)
        setBookmarkedPosts(res)
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
      }
    }
    fetchBookmarkedPosts()
  }, [user])

  useEffect(() => {
    if (bookmarkedPosts && bookmarkedPosts.length > 0) {
      const postIsBookmarked = bookmarkedPosts.some(
        (bookpost) => bookpost._id === post._id
      )
      setIsBookmarked(postIsBookmarked)
    }
  }, [bookmarkedPosts, post._id])

  const handleBookmarkToggle = async () => {
    try {
      await ToggleBookmark(user.id, post._id)
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  return (
    <button className="bookmark-btn" onClick={handleBookmarkToggle}>
      {isBookmarked ? (
        <i class="fa-solid fa-bookmark"></i>
      ) : (
        <i class="fa-regular fa-bookmark"></i>
      )}
    </button>
  )
}

export default BookmarkButton
