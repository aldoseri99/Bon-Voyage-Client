import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GetUserInfo } from '../services/Auth'
import { GetPostByUser } from '../services/postServices'

const ViewUser = ({ user }) => {
  const userId = useParams()
  console.log(userId.userId)

  const [userInfo, setUserInfo] = useState('')
  const [posts, setPosts] = useState('')
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
          <p>{userInfo.name}</p>
          <p>{userInfo.username}</p>
          {posts ? (
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
        </>
      ) : (
        <h1>No Post Available</h1>
      )}
    </div>
  )
}

export default ViewUser
