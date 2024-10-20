import React from "react"
import { createComment } from "../services/commentServices"

const Comment = ({ comments, postId, onCommentAdded }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.content.value

    if (title && content) {
      try {
        const newComment = await createComment(postId, { title, content })
        onCommentAdded(newComment)
        e.target.reset()
      } catch (error) {
        console.error("Error adding comment:", error)
      }
    }
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <h4>{comment.title}</h4>
          <p>{comment.content}</p>
          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  )
}

export default Comment
