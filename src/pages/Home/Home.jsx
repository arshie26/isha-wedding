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

  const [invite, setInvite] = useState();

  function logout(){
    console.log("LOgging out");
    signOut(auth);
  }

  if(props.user?.email){
    props.getInvite().then((found) => { 
      console.log(found);
      for(let i = 0; i < invitations.length; i++){
        if(i === found - 1){
          setInvite(invitations[i]);
        }
      }
      console.log("Homepage invite is ", invite);
    });
    
  }

  useEffect(() => {
    console.log("Homepage User is now ", props.user)
    //props.getInvite();

    
    
  }, [])

  return (
    <div> 
      <nav>
        <p>Isha and Abhishek</p>
        <button onClick={() => {logout()}}>Logout</button> 
      </nav>
      <div className="invite">

        <iframe src={invite} ></iframe>
      </div>
    </div>
  )
}

export default Home
