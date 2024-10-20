import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddPost = () => {
  const [post, setPost] = useState([])
  console.log("Received props:", post);
  let navigate = useNavigate();

  const initialState = {
    title: "",
    country: "",
    cost: "",
    rate: "",
    environment: "", // Add this
    temperature: "",  // Add this
    weather: "",      // Add this
    review: "",       // Add this
  }

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log("Updated formValues:", { ...formValues, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, photos: e.target.files[0] });
    console.log("Updated formValues with file:", { ...formValues, photos: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");

    const formData = new FormData();
    for (const key in formValues) {
      if (key === "photos") {
        formData.append("photos", formValues[key]);
      } else {
        formData.append(key, formValues[key]);
      }
    }
    
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/Posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Update the post array safely (check if post is an array or initialize it as an empty array)
      setPost((prevPosts) => (Array.isArray(prevPosts) ? [...prevPosts, response.data] : [response.data]));
      
      setFormValues(initialState); // Reset form values
      navigate("/"); // Navigate back to home
    } catch (error) {
      console.error("Error uploading form and file:", error);
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" onChange={handleChange} value={formValues.title} />
  
        <label htmlFor="country">Country: </label>
        <input type="text" id="country" onChange={handleChange} value={formValues.country} />
  
        <label htmlFor="temperature">Temperature: </label>
        <input type="number" id="temperature" onChange={handleChange} value={formValues.temperature} />
  
        <label htmlFor="weather">Weather: </label>
        <input type="text" id="weather" onChange={handleChange} value={formValues.weather} />
  
        <label htmlFor="review">Review: </label>
        <textarea id="review" onChange={handleChange} value={formValues.review}></textarea>
  
        <label htmlFor="photos">Photo: </label>
        <input type="file" id="photos" name="photos" onChange={handleFileChange} />
  
        <label htmlFor="rate">Rate: </label>
        <select id="rate" onChange={handleChange} value={formValues.rate}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
  
        <button type="submit">Add Post</button>
      </form>
    </div>
  )
};

export default AddPost;
