import {useState} from 'react'
//import { Link } from 'react-router-dom'
import './forms.css'
import {auth} from './firebase'
import {useAuthValue} from './AuthContext'
//const {setTimeActive} = useAuthValue()
//import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useHistory, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
function Register() {
  const {setTimeActive} = useAuthValue()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
const validatePassword = () => {
  let isValid = true
  if (password !== '' && confirmPassword !== ''){
    if (password !== confirmPassword) {
      isValid = false
      setError('Passwords does not match')
    }
  }
  return isValid
}
const register = e => {
  e.preventDefault()
  setError('')
  if(validatePassword()) {
    // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
      // .then((res) => {
      //     console.log(res.user)
      //   })
      // .catch(err => setError(err.message))
      .then(() => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          history.push('/verify-email')
        }).catch((err) => alert(err.message))
      })
  }
  setEmail('')
  setPassword('')
  setConfirmPassword('')
}

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
       {/* // <form name='registration_form'> */}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register