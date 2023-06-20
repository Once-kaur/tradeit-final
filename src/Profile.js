// import './profile.css'

// function Profile() {
  
//   return (
//     <div className='center'>
//       <div className='profile'>
//         <h1>Profile</h1>
//         <p><strong>Email: </strong> </p>
//         <p><strong>Email verified: </strong> </p>
//         <span>Sign Out</span>
//       </div>
//     </div>
//   )
// }

// export default Profile
import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
function Profile() {
  const {currentUser} = useAuthValue()

  return (
    <div className='center'>
      <div className='profile'>
        <h1>Profile</h1>
        <p><strong>Email: </strong>{currentUser?.email}</p>
        <p>
          <strong>Email verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>
        {/* <span>Sign Out</span> */}
        <span onClick={() => signOut(auth)}>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile