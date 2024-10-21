import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const AddActivities = ({ postId, activities, onActivityAdded }) => {
  let navigate = useNavigate()

  const initialState = {
    name: "",
    place: "",
    cost: "",
    rate: "",
    photos: [],
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files) // Convert FileList to Array
    setFormValues({ ...formValues, photos: files }) // Set the array of files
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    for (const key in formValues) {
      if (key === "photos") {
        formValues.photos.forEach((file) => {
          formData.append("photos", file) // Append each file
        })
      } else {
        formData.append(key, formValues[key])
      }
    }

    formData.append("post", postId)

    try {
      const response = await axios.post(
        `http://localhost:3001/activities/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      onActivityAdded(postId, response.data)
      setFormValues(initialState)
      navigate("/")
    } catch (error) {
      console.error("Error uploading form and file:", error)
    }
  }

  return (
    <div>
      <h2>Add Activity</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formValues.name}
        />

        <label htmlFor="place">Place: </label>
        <input
          type="text"
          id="place"
          onChange={handleChange}
          value={formValues.place}
        />

        <label htmlFor="cost">Cost: </label>
        <input
          type="number"
          id="cost"
          onChange={handleChange}
          value={formValues.cost}
        />

        <label htmlFor="photos">Photo: </label>
        <input
          type="file"
          id="photos"
          name="photos"
          multiple
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

        <button type="submit">Add Activity</button>
      </form>
    </div>
  )
}

export default AddActivities
