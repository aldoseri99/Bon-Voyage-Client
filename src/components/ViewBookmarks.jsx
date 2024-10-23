import { useEffect, useState } from 'react'
import { GetBookmarked } from '../services/postServices'
import { Link } from 'react-router-dom'
import BookmarkButton from './BookmarkButton'

const ViewBookmarks = ({ user, userInfo, hasLiked, handleLikeToggle }) => {
  const [bookmarkPosts, setBookmarkPost] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      const res = await GetBookmarked(user.id)
      console.log(res)

      setBookmarkPost(res)
    }
    getPosts()
  }, [user])
  return (
    <div className="post">
      {bookmarkPosts?.map((post) => (
        <div key={post._id} className="post-inner">
          {post.User && (
            <div className="post-user">
              <Link to={`/ViewUser/${post.User._id}`}>
                <img
                  src={`http://localhost:3001/profilePics/${post.User.profilePic}`}
                  alt={`${post.User.username}'s profile`}
                  className="user-profile-pic"
                />
              </Link>
              <Link className="userLink" to={`/ViewUser/${post.User._id}`}>
                <p className="username">{post.User.username}</p>
              </Link>
            </div>
          )}
          <div className="post-main">
            <Link to={`/details/${post._id}`}>
              <img
                className="post-img"
                src={`http://localhost:3001/uploadPost/${post.photos}`}
                alt="post photo"
              />
            </Link>
            <div className="post-main-info">
              <Link to={`/details/${post._id}`}>
                <h3>{post.title}</h3>
              </Link>
              <h3>
                {post.rate}
                <i class="fa-solid fa-star"></i>
              </h3>
            </div>
          </div>

          <div className="post-details">
            <button
              className="post-like"
              onClick={() => handleLikeToggle(post._id)}
            >
              {hasLiked(post) ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i class="fa-regular fa-heart"></i>
              )}
            </button>
            <BookmarkButton user={user} post={post} />
          </div>
        </div>
      ))}
    </div>
  )
}
export default ViewBookmarks
