import Client from './api'

export const GetPost = async () => {
  try {
    const res = await Client.get('/Posts')
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
