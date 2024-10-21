import Client from './api'


// Function to get posts
export const GetPost = async () => {
  try {
    const response = await fetch("http://localhost:3001/Posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    console.log("Fetched posts from API:", data); // Log the data to see if it's correct
    return data;
  } catch (error) {
    console.error("Error in GetPost:", error);
    throw error; // Propagate error for handling
  }
};


// Function to add a new post
export const setPost = async (postData) => {
  try {
    const res = await Client.post("/Posts", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data; // Return the created post data
  } catch (error) {
    throw error; // Propagate the error for handling in the component
  }
}


export const PostDetail = async (id) => {
  try {
    const res = await Client.get(`/Posts/details/${id}`)
    return res.data[0]
  } catch (error) {
    throw error
  }
}

