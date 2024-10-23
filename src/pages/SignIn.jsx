import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    if (payload.message) {
      setErrorMessage(payload.message)
      console.log()

      return
    }
    setFormValues({ email: '', password: '' })
    setUser(payload.user)
    console.log(payload.user)

    navigate('/')
  }

  return (
    <div className="full-page-cover">
  <div className="login-page">
    <div className="signin col">
      <div className="card-overlay centered">
        <h4 className="login-msg">Login</h4>
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-wrapper">
              <label htmlFor="email" className="label-input">
                Username/Email
              </label>
              <input
                className="input-sginin"
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="example@example.com"
                value={formValues.email}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password" className="label-input">
                Password
              </label>
              <input
                className="input-sginin" 
                onChange={handleChange}
                type="password"
                name="password"
                value={formValues.password}
                required
              />
            </div>
          </div>
          <div>{errorMessage}</div>
          <button
            className="signin-button"
            disabled={!formValues.email || !formValues.password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default SignIn
