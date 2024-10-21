import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetUserInfo } from '../services/Auth'
import { GetPostByUser } from '../services/postServices'

const ViewUser = ({ user }) => {
  if (user) {
    const [userInfo, setUserInfo] = useState('')
    const [posts, setPosts] = useState('')
    useEffect(() => {
      const getInfo = async () => {
        const res = await GetUserInfo(user.id)
        const PostRes = await GetPostByUser(user.id)
        console.log(PostRes.data[0])
        setUserInfo(res.user[0])
        setPosts(PostRes.data)
      }
      getInfo()
    }, [])
    return (
      <div>
        {userInfo ? (
          <>
            <p>{userInfo.name}</p>
            <p>{userInfo.username}</p>
            {posts ? (
              posts.map((post) => (
                <div className="post-user" key={post._id}>
                  <img
                    src={`http://localhost:3001/uploadPost/${post.photos}`}
                    alt=""
                  />
                  <div className="post-user-info">
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
}

export default ViewUser
