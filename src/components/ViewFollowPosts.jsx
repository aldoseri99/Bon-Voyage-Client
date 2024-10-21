import { useEffect, useState } from 'react'
import { GetPostByFollow } from '../services/postServices'
import { Link } from 'react-router-dom'

const ViewFollowPosts = ({ user }) => {
  if (user) {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
      const getFollowPosts = async () => {
        const res = await GetPostByFollow(user.followings)
        setPosts(res)
      }
      getFollowPosts()
    }, [user])
    return (
      <div>
        {posts
          ? posts.map((post) => (
              <div key={post._id}>
                <div className="post-user">
                  {post.User && (
                    <>
                      <img
                        src={`http://localhost:3001/profilePics/${post.User.profilePic}`} // Adjust the path based on your backend
                        alt={`${post.User.username}'s profile`}
                        className="user-profile-pic"
                      />
                      <Link to={`/ViewUser/${post.User._id}`}>
                        <span className="username">{post.User.username}</span>
                      </Link>
                    </>
                  )}
                </div>

                <div className="post-img">
                  <img
                    src={`http://localhost:3001/uploadPost/${post.photos}`}
                    alt="post photo"
                  />
                </div>

                <div className="post-title">
                  <h3>{post.title}</h3>
                </div>

                <div className="post-country">
                  <h3>{post.country}</h3>
                </div>

                <div className="post-cost">
                  <h3>{post.cost} BHD</h3>
                </div>

                <div className="post-rate">
                  <h3>{post.rate}</h3>
                </div>

                <div className="post-like">
                  <h4>{post.like}</h4>
                </div>

                <div>
                  <h4>Activities:</h4>
                  {post.activities.length === 0 ? (
                    <p>No Activities</p>
                  ) : (
                    post.activities.map((activity) => (
                      <div key={activity._id}>
                        <h5>{activity.name}</h5>
                      </div>
                    ))
                  )}
                </div>

                <div>
                  <Link to={`/details/${post._id}`}>
                    <button>Details</button>
                  </Link>
                </div>
              </div>
            ))
          : null}
      </div>
    )
  }
}
export default ViewFollowPosts
