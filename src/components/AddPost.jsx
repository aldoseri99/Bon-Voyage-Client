import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const AddPost = () => {
  const [post, setPost] = useState([])
  const [countries, setCountries] = useState([])
  console.log('Received props:', post)
  let navigate = useNavigate()

  useEffect(() => {
    const FetchCountry = async () => {
      const res = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,common'
      )
      res.data.sort((a, b) => {
        const nameA = a.name.common.toUpperCase() // ignore upper and lowercase
        const nameB = b.name.common.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        return 0
      })
      console.log(res.data[0].name.common)
      setCountries(res.data)
    }
    FetchCountry()
  }, [])

  const initialState = {
    title: '',
    country: '',
    cost: '',
    rate: '',
    environment: '',
    temperature: '',
    weather: '',
    review: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
    console.log(e.target.id, e.target.value)

    console.log('Updated formValues:', {
      ...formValues,
      [e.target.id]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, photos: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting form')

    const formData = new FormData()
    for (const key in formValues) {
      if (key === 'photos') {
        formData.append('photos', formValues[key])
      } else {
        formData.append(key, formValues[key])
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    try {
      const token = localStorage.getItem('token')

      const response = await axios.post(
        'http://localhost:3001/Posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )

      setPost((prevPosts) =>
        Array.isArray(prevPosts)
          ? [...prevPosts, response.data]
          : [response.data]
      )

      setFormValues(initialState)
      navigate('/')
    } catch (error) {
      console.error('Error uploading form and file:', error)
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
        <select name="" id="country" onChange={handleChange}>
          <option selected value="-" disabled>
            --
          </option>
          {countries?.map((country, index) => (
            <option value={country.name.common} key={index}>
              {country.name.common}
            </option>
          ))}
        </select>

        <label htmlFor="temperature">Temperature: </label>
        <input
          type="number"
          id="temperature"
          onChange={handleChange}
          value={formValues.temperature}
        />

        <label htmlFor="cost">Cost</label>
        <input
          type="number"
          id="cost"
          onChange={handleChange}
          value={formValues.cost}
        />

        <label htmlFor="weather">Weather: </label>
        <select type="text" id="weather" onChange={handleChange}>
          <option selected value="-" disabled>
            --
          </option>
          <option value="sunny">Sunny</option>
          <option value="cloudy">Cloudy</option>
          <option value="rainy">Rainy</option>
          <option value="snowy">Snowy</option>
          <option value="windy">Windy</option>
        </select>

        <label htmlFor="environment">Environment</label>
        <select type="text" id="environment" onChange={handleChange}>
          <option selected value="-" disabled>
            --
          </option>
          <option value="city">City</option>
          <option value="nature">Nature</option>
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="desert">Desert</option>
        </select>

        <label htmlFor="review">Review: </label>
        <input
          type="text"
          id="review"
          onChange={handleChange}
          value={formValues.review}
        />

        <label htmlFor="rate">Rate: </label>
        <select id="rate" onChange={handleChange}>
          <option selected value="-" disabled>
            --
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="photos">Photo: </label>
        <input
          type="file"
          id="photos"
          name="photos"
          onChange={handleFileChange}
        />

        <button type="submit">Add Post</button>
      </form>
    </div>
  )
}

export default AddPost
