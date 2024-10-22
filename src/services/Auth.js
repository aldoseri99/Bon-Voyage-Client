import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllUsers = async (user_id) => {
  try {
    const res = await Client.get(`/auth/users/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const Follow = async (user_id, data) => {
  try {
    const res = await Client.put(`/auth/follow/${user_id}`, data)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const GetUserInfo = async (user_id) => {
  try {
    const res = await Client.put(`/auth/user/${user_id}`)
    console.log(res)

    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateUser = async (user_id, data) => {
  try {
    const res = await Client.put(`/auth/edit/${user_id}`, data)
    console.log(res)

    return res.data
  } catch (error) {
    throw error
  }
}

export const SearchUsers = async (query) => {
  try {
    const res = await Client.get(`/auth/search/${query}`)

    return res.data
  } catch (error) {
    throw error
  }
}
