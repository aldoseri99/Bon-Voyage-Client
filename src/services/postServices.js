import Client from './api'


// Function to get posts
export const GetPost = async () => {
  try {
    const response = await fetch("http://localhost:3001/Posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    console.log("Fetched posts from API:", data);
    return data;
  } catch (error) {
    console.error("Error in GetPost:", error);
    throw error;
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
    return res.data;
  } catch (error) {
    throw error;
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

