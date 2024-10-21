import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostDetail } from '../services/postServices'

const Details = () => {
  const { id } = useParams()
  const [post, setPost] = useState()
  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const response = await PostDetail(id)
        setPost(response)
      } catch (error) {
        console.log('error')
      }
    }
    getPostDetails()
  }, [])
  return (
    <div>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <img src={`http://localhost:3001/uploadPost/${post.photos}`} />
          <p>Review: {post.review}</p>
          <p>cost: {post.cost}</p>
          <p>Rating: {post.rate}</p>
          <p>weather: {post.weather}</p>
          <p>temperature: {post.temperature}</p>
          <p>date: {post.date}</p>
          <p>country: {post.country}</p>
          <p>environment: {post.environment}</p>
          <p>likes: {post.likes}</p>
          <table>
            <tr>
              <th>place</th>
              <th>name</th>
              <th>image</th>
              <th>cost</th>
              <th>rate</th>
            </tr>
            {post.activities.map((activity) => (
              <tr>
                <td>{activity.place}</td>
                <td>{activity.name}</td>
                <td>
                  <img
                    className="activity-img"
                    src={`http://localhost:3001/uploadPost/${activity.photos}`}
                    alt=""
                  />
                </td>
                <td>{activity.cost}</td>
                <td>{activity.rate}</td>
              </tr>
            ))}
          </table>
          {post.comments.map((comment) => (
            <div>
              <h4>{comment.title}</h4>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Details
