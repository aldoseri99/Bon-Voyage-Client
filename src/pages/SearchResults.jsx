import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SearchUsers } from '../services/Auth'

const SearchResults = () => {
  const query = useParams()
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      console.log(query.query)
      const res = await SearchUsers(query.query.split(' ').join(''))
      console.log(res)
      setUsers(res.users)
    }
    fetchUsers()
  }, [query])

  return (
    <>
      {users ? (
        users.map((user) => (
          <div>
            <h1>{user.username}</h1>
          </div>
        ))
      ) : (
        <div>
          <h1>search</h1>
        </div>
      )}
    </>
  )
}

export default SearchResults
