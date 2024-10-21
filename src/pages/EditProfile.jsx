import { useEffect, useState } from 'react'
import { GetUserInfo, UpdateUser } from '../services/Auth'
import { Link, Navigate } from 'react-router-dom'

const EditProfile = ({ user, setUser }) => {
  if (user) {
    const [userInfo, setUserInfo] = useState('')
    useEffect(() => {
      const getInfo = async () => {
        const res = await GetUserInfo(user.id)
        setUserInfo(res.user[0])
      }
      getInfo()
    }, [])
    const [errorMessage, setErrorMessage] = useState('')
    const [formValues, setFormValues] = useState('')

    const handleChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!formValues.name && !formValues.username && !formValues.profilePic) {
        setErrorMessage('No changes has been made')
        return
      } else if (!formValues.name) {
        setFormValues({ name: userInfo.name })
      } else if (!formValues.username) {
        setFormValues({ username: userInfo.username })
      } else if (!formValues.profilePic) {
        setFormValues({ profilePic: userInfo.profilePic })
      }
      const formData = new FormData()
      for (const key in formValues) {
        if (key === 'profilePic') {
          formData.append('profilePic', formValues[key])
        } else {
          formData.append(key, formValues[key])
        }
      }
      try {
        const res = await UpdateUser(user.id, formValues, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (res.message) {
          setErrorMessage(res.message)

          return
        }
        console.log(res)
        setFormValues('')
      } catch (error) {
        throw error
      }
    }
    return (
      <div>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="name  ">Name: </label>
            <input
              onChange={handleChange}
              placeholder={user.name}
              name="name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              onChange={handleChange}
              placeholder={user.username}
              name="username"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="profilePic">Profile Picture: </label>
            <input onChange={handleFileChange} name="profilePic" type="file" />
          </div>
          <div>{errorMessage}</div>
          <Link to="/">
            <button>Cancel</button>
          </Link>
          <button>Confirm</button>
        </form>
      </div>
    )
  }
}

export default EditProfile
