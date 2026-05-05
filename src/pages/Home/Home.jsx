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

  const invitations = [one, two, three, four, five, six];

  const [invitation, setInvitation] = useState();

  function logout(){
    console.log("LOgging out");
    signOut(auth);
  }

  /*if(props.user?.email){
      for(let i = 0; i < invitations.length; i++){
        if(i === props.invite - 1){
          setInvitation(invitations[i]);
        }
      }
      console.log("Homepage invite is ", props.invite);
  }*/

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
