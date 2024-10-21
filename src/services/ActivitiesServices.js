import Client from "./api"

export const createActivity = async (postId, ActivityData) => {
  const response = await Client.post(`/activities/${postId}`, ActivityData)
  return response.data
}

export const getActivity = async (postId) => {
  const response = await Client.get(`/activities/${postId}`)
  return response.data
}

export const deleteActivity = async (activitiesId) => {
  await Client.delete(`/activities/${activitiesId}`)
}
