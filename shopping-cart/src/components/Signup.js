import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../config/Config'
import { collection, addDoc } from 'firebase/firestore'

// this is the signup component
export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");

    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) =>{
            const user = userCredential.user;
            const initialcartvalue = 0;
            console.log(user);

            addDoc(collection(db, "users"), {
                username: username, email: email, phonenumber: 
                phonenumber, password: password, cart: initialcartvalue,
                uid: user.uid
            }).then(() => {
                setSuccessMsg('New user successfully added, You will now be automatically redirected to login page')
                setUsername('')
                setPhonenumber('')
                setEmail ('')
                setPassword('')
                setErrorMsg('')
                setTimeout(() => {
                    setSuccessMsg('');
                    navigate('/login');
                }, 4000)
            })
            .catch((error) => {setErrorMsg(error.message)});
        })
        .catch((error) => {
            if (error.message == 'Firebase: Error (auth/invalid-email).')
            {
                setErrorMsg('Please fill all required fields')
            }
            if (error.message == 'Firebase: Error (auth/email-already-in-use.') {
                setErrorMsg('User already exists');
            }
        });

    }

    return (
    <div>
      <Navbar />
      <div className='signup-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
            <p>Create Account</p>

            {successMsg &&<>
                <div className='success-msg'>
                    {successMsg}
                </div></>}
            {errorMsg && <>
                <div className='error-msg'>
                    {errorMsg}
                </div></>}
            <label>Your Name</label>
            <input onChange={(e) => setUsername(e.target.value)}
            type='text' placeholder='First and last name' />

            <label>Mobile Number</label>
            <input onChange={(e) => setPhonenumber(e.target.value)}
            type='tel' placeholder='Mobile number' />

            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)}
            type='email' placeholder='Enter your email' />

            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)}
            type='password' placeholder='Enter your password' />

            <button type='submit'>Sign Up</button>
            <div>
                <span>Already have an account?</span>
                <Link to='/login'>Sign In</Link>
            </div>
        </form>
      </div>
    </div>
  )
}


