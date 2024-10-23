import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const AddActivities = ({ postId, activities, onActivityAdded }) => {
  const navigate = useNavigate()

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
    const files = Array.from(e.target.files)
    setFormValues({ ...formValues, photos: files })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    for (const key in formValues) {
      if (key === "photos") {
        formValues.photos.forEach((file) => {
          formData.append("photos", file)
        })
      } else {
        formData.append(key, formValues[key])
      }
    }

    formData.append("post", postId)

    const token = localStorage.getItem("token")

    try {
      const response = await axios.post(
        `http://localhost:3001/activities/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      onActivityAdded(postId, response.data)
      setFormValues(initialState)
    } catch (error) {
      console.error("Error uploading form and file:", error)
    }
  }

  return (
    <div className="add-activity-container">
      <h2>Add Activity</h2>
      <form className="add-activity-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={formValues.name}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="place">Place: </label>
          <input
            type="text"
            id="place"
            onChange={handleChange}
            value={formValues.place}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost: </label>
          <input
            type="number"
            id="cost"
            onChange={handleChange}
            value={formValues.cost}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photos">Photo: </label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rate">Rate: </label>
          <select
            id="rate"
            onChange={handleChange}
            value={formValues.rate}
            required
          >
            <option value="">Select Rate</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Activity
        </button>
      </form>
    </div>
  )
}

export default AddActivities
