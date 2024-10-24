import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SearchUsers } from '../services/Auth'
import FollowButton from '../components/FollowButton'
import '../../public/CSS/UserLists.css'

const SearchResults = ({ user }) => {
  const query = useParams()
  const [account, setAccount] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      console.log(query.query)
      const res = await SearchUsers(query.query.split(' ').join(''))
      console.log(res.users[0].followings.length)
      setAccount(res.users)
    }
    fetchUsers()
  }, [query])

  return (
    <>
      {account && account.length > 0 ? (
        <>
          <h1>search results for {query.query}</h1>
          <div className="user-card-container">
            {account.map((account) => (
              <div className="user-card" key={account._id}>
                <div className="user-card-pic">
                  <Link className="table-link" to={`/ViewUser/${account._id}`}>
                    <img
                      className="user-card-pic"
                      src={`https://bon-voyage.fly.dev/profilePics/${account.profilePic}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="username">
                  <Link className="table-link" to={`/ViewUser/${account._id}`}>
                    {account.username}
                  </Link>
                  <p>{account.followings.length} Following</p>
                </div>
                <div>
                  {user ? <FollowButton user={user} account={account} /> : null}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1>no result found</h1>
        </div>
      )}
    </>
  )
}

export default SearchResults
