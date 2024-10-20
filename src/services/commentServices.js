import Client from "./api"

export const createComment = async (postId, commentData) => {
  const response = await Client.post(`/comment/${postId}`, commentData)
  return response.data
}

export const getComments = async (postId) => {
  const response = await Client.get(`/comment/${postId}`)
  return response.data
}
