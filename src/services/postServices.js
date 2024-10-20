import Client from "./api"

export const GetPost = async () => {
  try {
    const res = await Client.get("/Posts")
    return res.data
  } catch (error) {
    throw error
  }
}
