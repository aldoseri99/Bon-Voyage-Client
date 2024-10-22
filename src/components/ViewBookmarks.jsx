import { useEffect, useState } from 'react'
import { GetBookmarked } from '../services/postServices'
import { Link } from 'react-router-dom'

const ViewBookmarks = ({ user }) => {
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
    <div>
      <br />
      <hr />
      <h1>bookmark</h1>
      {bookmarkPosts?.map((post) => (
        <div className="viewuser-post" key={post._id}>
          <img src={`http://localhost:3001/uploadPost/${post.photos}`} alt="" />
          <div className="view-post-info">
            <p>{post.title}</p>
            <p>{post.country}</p>
            <Link to={`/details/${post._id}`}>
              <button>Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ViewBookmarks
