import React, {useRef, useEffect} from 'react'
import { auth } from '../../firebase/init.js'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import one from '../../assets/Invitation 1.pdf'
import two from '../../assets/Invitation 2.pdf'
import three from '../../assets/Invitation 3.pdf'
import four from '../../assets/Invitation 4.pdf'
import five from '../../assets/Invitation 5.pdf'
import six from '../../assets/Invitation 6.pdf'


import './Home.css'

const Home = (props) => {

  /* ARRAY OF ALL INVITATIONS */
  const invitations = [one, two, three, four, five, six];

  /* STATE VARIABLE FOR INVITATION TO BE DISPLAYED */
  const [invitation, setInvitation] = useState();

  /* LOGOUT FUNCTION */
  function logout(){
    console.log("LOgging out");
    signOut(auth);
  }

  /* USEEFFECT HOOK TO RETRIEVE INVITATION
    ONCE USER HAS LOGGED IN */
  useEffect(() => {
    console.log("Homepage user is now ", props.user)
    props.getInvite().then((invite) => {
      setInvitation(invitations[invite-1])
    })
    
  }, [props.user])

  return (
    <div> 
      <nav>
        <p>Isha and Abhishek</p>
        <button onClick={() => {logout()}}>Logout</button> 
      </nav>
      <div className="invite">

        <iframe src={invitation} ></iframe>
      </div>
    </div>
  )
}

export default Home
