import { useEffect, useState } from 'react'
import { GetUserInfo, UpdateUser } from '../services/Auth'
import { Link, useNavigate } from 'react-router-dom'
import '../../public/CSS/EditProfile.css'

const EditProfile = ({ user, setUser }) => {
  if (user) {
    let navigate = useNavigate()
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

    const [profilePic, setProfilePic] = useState(
      user.profilePic
        ? `http://localhost:3001/profilePics/${user.profilePic}`
        : '/default-pic.png'
    )

    // Display image preview when file is selected
    // Display image preview when file is selected
    const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setProfilePic(event.target.result)
        }
        reader.readAsDataURL(file)
      }

      handleFileChange(e)
    }

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
        const res = await UpdateUser(user.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (res.message) {
          setErrorMessage(res.message)
          navigate(`/ViewUser/${user.id}`)
          return
        }
        console.log(res)
        setUser(res.user)
        setFormValues('')
        navigate(`/ViewUser/${user.id}`)
      } catch (error) {
        throw error
      }
    }
    return (
      <div className="full-page-cover-edit">
        <form onSubmit={handleSubmit} action="" className="edit-form">
          <h4 className="Register-msg">Edit Profile</h4>
          <div className="top-form">
            <div className="text-inputs">
              <div className="edit-input">
                <label htmlFor="name  ">Name </label>
                <input
                  onChange={handleChange}
                  placeholder={userInfo.name}
                  name="name"
                  type="text"
                />
              </div>
              <div className="edit-input">
                <label htmlFor="username">Username </label>
                <input
                  onChange={handleChange}
                  placeholder={userInfo.username}
                  name="username"
                  type="text"
                />
              </div>
            </div>
            <div className="profile-pic-container">
              <label htmlFor="profilePicInput">
                <img src={profilePic} alt="Profile" className="profile-pic" />
              </label>

              <input
                id="profilePicInput"
                name="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div>{errorMessage}</div>
          <div className="form-btn">
            <Link to="/">
              <button className="create-button">Cancel</button>
            </Link>
            <button className="create-button">Confirm</button>
          </div>
        </form>
      </div>
    )
  }
}

export default EditProfile
