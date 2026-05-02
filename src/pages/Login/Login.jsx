import React, { useEffect, useState } from 'react'
import './Login.css'
import { db } from '../../firebase/init'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import hero from  "../../assets/2J1A1449 final.jpg";


const Login = (props) => {

  const [loading, setLoading] = useState(false);

  /* ACTIVATE NAVIGATION HOOK */
  const navigate = useNavigate();

  /* REACT STATE VARIABLES FOR FORM FIELDS */
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  /* ERROR DISPLAY FUNCTION FOR BAD USER INPUT */
  function inputError(){
    /* ERROR: EMAIL ADDRESS DOES NOT INCLUDE @" */
    if(!email.includes("@"))
      {toast.error("Make sure your email includes @domain.com")} 
  }

  async function getAllUsers(){
    const { users } = getDocs(collection(db, "user"));
    let existingUser = users.filter((user) => {
      user.email === email;
    })
    return Object.keys(existingUser).length > 0;
  }

  /* LOGIN/REGISTRATION METHOD */
  async function register(event) {
    setLoading(true);
    event.preventDefault();
    console.log("login");
    console.log(event);
     
    /* LOGIN SEQUENCE */
      /* LOGIN AND NAVIGATE TO HOME PAGE UPON SUCCESSFUL LOGIN*/
      try{
        console.log("Email and password submtted are ", email, password);
        let response = await signInWithEmailAndPassword(props.auth, email, password);
        console.log("login user is now ", response);
        setLoading(false);
        navigate("/");
      }
      /* IF LOGIN IS NOT SUCCESSFUL, DISPLAY ERROR MESSAGE */
      catch(error){
        setLoading(false);
        console.log("error is ", error);
        toast.error(error.code)
      }
  }


  
  return (
    <div>
      
      <div className="login">
        
        <div className="login__form">
          <h1 className="title">Isha and Abhishek</h1>
          <img src={hero} />  
          <h3 className="title">Sign in for your Wedding Invitation</h3>
          <form onSubmit={register /* SUBMISSION STAGE TOGGLE NOT WORKING */}>
            <label>Email Address</label>
            <br />
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} onInvalid={() => {inputError()}} 
            className="input email__input" placeholder="email@email.com" />

            <label>Password</label>
            <br />
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} onInvalid={() => {inputError()}} 
            className="input password__input" placeholder="password" />
            <p>Password is wedding2026</p>

            <button type='submit' className='login__btn'>Enter</button>
            
          </form>
        </div>
      </div>
    
    </div>
  )
}

export default Login
