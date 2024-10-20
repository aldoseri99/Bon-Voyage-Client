import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()
  const initialState = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
  const [formValues, setFormValues] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formValues.name ||
      !formValues.email ||
      !formValues.username ||
      !formValues.password ||
      !formValues.confirmPassword
    ) {
      setErrorMessage('All fields are required.')
      return
    }

    const usernameRegex = /^[a-zA-Z0-9._-]+$/

    if (!usernameRegex.test(formValues.username)) {
      setErrorMessage(
        'Username can only contain letters, numbers, ".", "_", "-" and no spaces.'
      )
      return
    }

    if (formValues.password.length <= 7) {
      setErrorMessage('Password must be more than 7 characters.')
      return
    }

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      const res = await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        username: formValues.username
      })
      if (res.message) {
        setErrorMessage(res.message)

        return
      }
      setFormValues(initialState)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.')
    }
  }

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="name">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="John Smith"
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <div>{errorMessage}</div>
          <button
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
