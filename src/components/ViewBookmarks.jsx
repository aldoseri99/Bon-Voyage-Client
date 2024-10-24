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
                  src={`https://bon-voyage.fly.dev/profilePics/${post.User.profilePic}`}
                  alt={`${post.User.username}'s profile`}
                  className="user-profile-pic"
                />
              </Link>
              <Link className="userLink" to={`/ViewUser/${post.User._id}`}>
                <p className="username-post">{post.User.username}</p>
              </Link>
            </div>
          )}
          <div className="post-main">
            <Link to={`/details/${post._id}`}>
              <img
                className="post-img"
                src={`https://bon-voyage.fly.dev/uploadPost/${post.photos}`}
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

          <div className="post-information">
            <div className="LikeComment">
              <button
                className="post-like"
                onClick={() => handleLikeToggle(post._id)}
              >
                {hasLiked(post) ? (
                  <>
                    <i class="fa-solid fa-heart"></i>
                    <p>{post.like}</p>
                  </>
                ) : (
                  <>
                    <i class="fa-regular fa-heart"></i>
                    <p>{post.like}</p>
                  </>
                )}
              </button>
              <Link to={`/details/${post._id}`}>
                <button>
                  <i class="fa-regular fa-comment fa-flip-horizontal"></i>
                  <p>{post.comments.length}</p>
                </button>
              </Link>
            </div>
            <BookmarkButton user={user} post={post} />
          </div>
        </div>
      ))}
    </div>
  )
}
export default ViewBookmarks
