import React from 'react'
import { createComment, deleteComment } from '../services/commentServices'

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
        console.error('Error adding comment:', error)
      }
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId)
      onCommentDeleted(commentId)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  return (
    <div className="commint-css">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="post-user">
            {comment.user && (
              <>
                <img
                  src={`http://localhost:3001/profilePics/${comment.user.profilePic}`} // Adjust the path based on your backend
                  alt={`${comment.user.username}'s profile`}
                  className="user-profile-pic commint-img"
                />
                <span className="username">{comment.user.username}</span>
              </>
            )}
          </div>
          <button
            onClick={() => {
              handleDelete(comment._id)
            }}
          >
            {' '}
            delete{' '}
          </button>
          <div className="div-the-commint">
            <p className="the-commint">{comment.content}</p>
            <small className="comment-creatAT">
              {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="title"
          placeholder="Comment Title"
          value="title"
          required
        />
        <div className="add-comment">
          <textarea name="content" placeholder="Add Comment" required />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Comment
