import { useEffect, useState } from 'react'
import { GetUserInfo } from '../services/Auth'

const ViewUser = ({ user }) => {
  if (user) {
    const [userInfo, setUserInfo] = useState('')
    useEffect(() => {
      const getInfo = async () => {
        const res = await GetUserInfo(user.id)
        console.log(res.user[0])

        setUserInfo(res.user[0])
      }
      getInfo()
    }, [])
    return (
      <div>
        {userInfo ? (
          <>
            <p>{userInfo.name}</p>
            <p>{userInfo.username}</p>
          </>
        ) : (
          <h1>user</h1>
        )}
      </div>
    )
  }
}

export default ViewUser
