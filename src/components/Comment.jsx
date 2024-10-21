import React from "react"
import { createComment, deleteComment } from "../services/commentServices"

const Comment = ({ comments, postId, onCommentAdded, onCommentDeleted }) => {
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

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId)
      onCommentDeleted(commentId)
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <h4>{comment.title}</h4>
          <p>{comment.content}</p>
          <small>{new Date(comment.createdAt).toLocaleString()}</small>
          <button onClick={() => handleDelete(comment._id)}>Delete</button>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <h4>Add a Comment</h4>
        <input type="text" name="title" placeholder="Comment Title" required />
        <textarea name="content" placeholder="Comment Content" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Comment
