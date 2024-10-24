import { useEffect, useState } from 'react'
import { GetPostByFollow } from '../services/postServices'
import { Link } from 'react-router-dom'
import BookmarkButton from './BookmarkButton'
import { GetUserInfo } from '../services/Auth'
const ViewFollowPosts = ({ user }) => {
  if (user) {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
      const getFollowPosts = async () => {
        const userInfo = await GetUserInfo(user.id)
        if (userInfo.user[0].followings.length > 0) {
          const res = await GetPostByFollow(userInfo.user[0].followings)

          setPosts(res)
        } else {
          setPosts(null)
        }
      }
      getFollowPosts()
    }, [user])

    const handleLikeToggle = async (postId) => {
      if (!user || !user.id) {
        console.error('User is not defined or missing an ID.')
        return
      }

      try {
        const response = await fetch(
          `https://bon-voyage.fly.dev/Posts/like/${postId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.id })
          }
        )

        if (response.ok) {
          const updatedPost = await response.json()
          setPosts((prevPosts) =>
            prevPosts.map((post) => (post._id === postId ? updatedPost : post))
          )
        } else {
          console.error('Failed to update like count:', response.statusText)
        }
      } catch (error) {
        console.error('Error updating like count:', error)
      }
    }
    const hasLiked = (post) => {
      return user && user.id && post.likedBy && post.likedBy.includes(user.id)
    }

    return (
      <div className="post">
        {posts ? (
          posts.map((post) => (
            <div key={post._id} className="post-inner">
              {post.User && (
                <div className="post-user">
                  <Link className="userLink" to={`/ViewUser/${post.User._id}`}>
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
          ))
        ) : (
          <h1>No Post Available</h1>
        )}
      </div>
    )
  }
}
export default ViewFollowPosts
