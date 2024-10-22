import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GetUserInfo } from '../services/Auth'
import { GetPostByUser } from '../services/postServices'
import ViewBookmarks from './ViewBookmarks'

const ViewUser = ({ user }) => {
  const userId = useParams()
  console.log(userId.userId)

  const [userInfo, setUserInfo] = useState('')
  const [posts, setPosts] = useState('')
  const [showBookmarks, setShowBookmarks] = useState(false)
  useEffect(() => {
    const getInfo = async () => {
      const res = await GetUserInfo(userId.userId)
      const PostRes = await GetPostByUser(userId.userId)
      console.log(PostRes.data[0])
      setUserInfo(res.user[0])
      setPosts(PostRes.data)
    }
    getInfo()
  }, [userId])
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))
        navigate('/')
      } else {
        console.error('Failed to delete the post:', response.statusText)
      }
    } catch (error) {
      console.error("Error can't delete the post:", error)
    }
  }
  return (
    <div>
      {userInfo ? (
        <>
          <img
            className="user-profile-pic-large"
            src={`http://localhost:3001/profilePics/${userInfo.profilePic}`}
            alt=""
          />
          <p>{userInfo.username}</p>
          <p>{userInfo.name}</p>
          <Link>
            <p>Followings: {userInfo.followings.length}</p>
          </Link>
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

            {showBookmarks ? (
              <ViewBookmarks user={user} />
            ) : posts && posts.length > 0 ? (
              posts.map((post) => (
                <div className="viewuser-post" key={post._id}>
                  <img
                    src={`http://localhost:3001/uploadPost/${post.photos}`}
                    alt=""
                  />
                  <div className="view-post-info">
                    {user.id === userInfo._id ? (
                      <button onClick={() => handleDelete(post._id)}>
                        Delete
                      </button>
                    ) : null}
                    <p>{post.title}</p>
                    <p>{post.country}</p>
                    <Link to={`/details/${post._id}`}>
                      <button>Details</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Post Available</h1>
            )}
          </div>
        </>
      ) : (
        <h1>No Post Available</h1>
      )}
    </div>
  )
}

export default ViewUser
