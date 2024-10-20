import Client from "./api";

// Function to get posts
export const GetPost = async () => {
  try {
    const res = await Client.get("/Posts");
    return res.data;
  } catch (error) {
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
    return res.data; // Return the created post data
  } catch (error) {
    throw error; // Propagate the error for handling in the component
  }
};
