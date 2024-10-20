import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const AddPost = ({ post, setPost}) => {
  let navigate = useNavigate()

  const initialState = {
    title: "",
    country: "",
    cost: "",
    rate: "",
    photos: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    for (const key in formValues) {
      if (key === "image") {
        formData.append("image", formValues[key])
      } else {
        formData.append(key, formValues[key])
      }
    }

  try {
      const response = await axios.post(
        "http://localhost:3001/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setPost([...post, response.data])
      setFormValues(initialState)
      navigate("/")
    } catch (error) {
      console.error("Error uploading form and file:", error)
    }
  }

  
  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          onChange={handleChange}
          value={formValues.title}
        />

        <label htmlFor="country">Country: </label>
        <input
          type="text"
          id="country"
          onChange={handleChange}
          value={formValues.country}
        />

        <label htmlFor="cost">Cost: </label>
        <input
          type="number"
          id="cost"
          onChange={handleChange}
          value={formValues.cost}
        />

        <label htmlFor="image">Photo: </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
        
        <label htmlFor="rate">Rate: </label>
        <select id="rate" onChange={handleChange} value={formValues.rate}>
          <option value="1"> 1</option>
          <option value="2"> 2</option>
          <option value="3"> 3</option>
          <option value="4"> 4</option>
          <option value="5"> 5</option>
        </select>

        <button type="submit">Add Post</button>
      </form>
    </div>
  )













}

export default AddPost

