import Client from './api'

// Function to get posts
export const GetPost = async () => {
  try {
    const res = await Client.get('/Posts')
    return res.data
  } catch (error) {
    throw error
  }
}

// Function to add a new post
export const setPost = async (postData) => {
  try {
    const res = await Client.post('/Posts', postData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const PostDetail = async (id) => {
  try {
    const res = await Client.get(`/Posts/details/${id}`)
    return res.data[0]
  } catch (error) {
    throw error
  }
}

export const GetPostByUser = async (id) => {
  try {
    const res = await Client.get(`/Posts/user/${id}`)

    return res
  } catch (error) {
    throw error
  }
}

export const GetPostByFollow = async (array) => {
  try {
    const userIds = array.join(',')

    const res = await Client.get(`/Posts/followed/${userIds}`)

    return res.data
  } catch (error) {
    console.error('Error fetching posts by followings:', error)
    throw error
  }
}

export const GetBookmarked = async (userId) => {
  try {
    const res = await Client.get(`/Posts/bookmark/${userId}`)
    return res.data.bookmarks
  } catch (error) {
    throw error
  }
}

export const ToggleBookmark = async (userId, postId) => {
  try {
    const res = await Client.post(`/Posts/${userId}/bookmark/${postId}`)
  } catch (error) {
    throw error
  }
}

export const getCoordinates = async (country) => {
  const response = await fetch(
    `http://localhost:3001/location?country=${encodeURIComponent(country)}`
  )

  if (!response.ok) {
    throw new Error("Error fetching coordinates")
  }

  const data = await response.json()

  if (data.results.length === 0) {
    throw new Error("No results found")
  }

  return {
    lat: data.results[0].geometry.lat,
    lon: data.results[0].geometry.lng,
  }
}
