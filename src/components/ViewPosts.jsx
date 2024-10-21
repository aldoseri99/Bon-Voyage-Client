import { useState, useEffect } from "react";
import { GetPost } from "../services/postServices";
import { useNavigate } from "react-router-dom";

const ViewPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePosts = async () => {
      try {
        const data = await GetPost();
        console.log("Fetched Posts:", data);
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    handlePosts();
  }, [user]);

  const handleLikeToggle = async (postId) => {
    if (!user || !user.id) {
      console.error("User is not defined or missing an ID.");
      return;
    }

    console.log("Liking post with user:", user.id)

    try {
      const response = await fetch(`http://localhost:3001/Posts/like/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? updatedPost : post))
        );
      } else {
        console.error("Failed to update like count:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/Posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const hasLiked = (post) => {
    return user && user.id && post.likedBy && post.likedBy.includes(user.id);
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <div className="post-img">
              {post.photos ? (
                <img
                  src={`http://localhost:3001/uploadPost/${post.photos}`}
                  alt="post photo"
                />
              ) : (
                <p>No Image Available</p>
              )}
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
              <h4>{post.like} Likes</h4>
            </div>
            <button onClick={() => handleLikeToggle(post._id)}>
              {hasLiked(post) ? 'Remove Like' : 'Like'}
            </button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewPosts;
