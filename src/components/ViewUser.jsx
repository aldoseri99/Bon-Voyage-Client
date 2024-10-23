import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GetUserInfo } from "../services/Auth"
import { GetPostByUser } from "../services/postServices"
import ViewBookmarks from "./ViewBookmarks"
import "../../public/CSS/ViewUser.css"
import FollowButton from "./FollowButton"
import BookmarkButton from "./BookmarkButton"

const ViewUser = ({ user }) => {
  const userId = useParams()

  const [userInfo, setUserInfo] = useState("")
  const [posts, setPosts] = useState("")
  const [showBookmarks, setShowBookmarks] = useState(false)
  useEffect(() => {
    const getInfo = async () => {
      const res = await GetUserInfo(userId.userId)
      const PostRes = await GetPostByUser(userId.userId)
      setUserInfo(res.user[0])
      setPosts(PostRes.data)
    }
    getInfo()
  }, [userId])
  const handleLikeToggle = async (postId) => {
    if (!user || !user.id) {
      console.error("User is not defined or missing an ID.")
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3001/Posts/like/${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        }
      )

      if (response.ok) {
        const updatedPost = await response.json()
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? updatedPost : post))
        )
      } else {
        console.error("Failed to update like count:", response.statusText)
      }
    } catch (error) {
      console.error("Error updating like count:", error)
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))
        navigate("/")
      } else {
        console.error("Failed to delete the post:", response.statusText)
      }
    } catch (error) {
      console.error("Error can't delete the post:", error)
    }
  }
  const hasLiked = (post) => {
    return user && user.id && post.likedBy && post.likedBy.includes(user.id)
  }
  return (
    <div className="background-color">
      {userInfo ? (
        <>
          <section className="user-section">
            <div className="top-section">
              <img
                className="user-profile-pic-large"
                src={`http://localhost:3001/profilePics/${userInfo.profilePic}`}
                alt=""
              />
              <div className="names">
                <p className="name-username">{userInfo.username}</p>
                <p className="name-name">{userInfo.name}</p>
              </div>
              <div>
                {user.id === userInfo._id ? (
                  <button>Edit Profile</button>
                ) : (
                  <FollowButton user={user} account={userInfo} />
                )}
              </div>
            </div>
            <div className="bottom-section">
              <p>
                {posts.length} <span>Posts</span>
              </p>
              <Link to={`/followings/${userInfo._id}`}>
                <p>
                  {userInfo.followings.length} <span>Followings</span>
                </p>
              </Link>
            </div>
          </section>
          <div>
            {user.id === userInfo._id && (
              <>
                <button onClick={() => setShowBookmarks(false)}>
                  View Posts
                </button>
                <button onClick={() => setShowBookmarks(true)}>
                  View Bookmarks
                </button>
              </>
            )}
            <div className="post">
              {showBookmarks ? (
                <ViewBookmarks
                  user={user}
                  userInfo={userInfo}
                  hasLiked={hasLiked}
                  handleLikeToggle={handleLikeToggle}
                />
              ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="post-inner">
                    {post.User && (
                      <div className="post-user">
                        <Link to={`/ViewUser/${post.User._id}`}>
                          <img
                            src={`http://localhost:3001/profilePics/${userInfo.profilePic}`}
                            alt={`${userInfo.username}'s profile`}
                            className="user-profile-pic"
                          />
                        </Link>
                        <Link
                          className="userLink"
                          to={`/ViewUser/${post.User._id}`}
                        >
                          <p className="username">{userInfo.username}</p>
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
                ))
              ) : (
                <h1>No Post Available</h1>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1>No Post Available</h1>
      )}
    </div>
  )
}

export default ViewUser
