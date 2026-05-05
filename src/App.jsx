import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { auth, db } from './firebase/init.js'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  /* STATE VARIABLE FOR USER */
  const [authUser, setAuthUser] = useState({});

  /* STATE VARIABLE FOR INVITE VERSION
      USED IF CALLING GETINVITATION FROM APP */
  const [invite, setInvite] = useState();

  /* ACTIVATE NAVIGATION HOOK */
  const navigate = useNavigate();

  


  /* 
  
  CODING PATTERNS TO GET USER SPECIFIC DATA

  PATTERNS 1-3: DATA RETRIEVAL IS CALLED FROM APP AND PASSED TO HOME

  HOME.JSX PATTERN (USED WITH PATTERNS 1,2, OR 3)
  ACCESS INVITATION DATA FROM PROPS
  
  if(props.invitation && !invitation){
    console.log("Homepage invite is ", props.invitation);
    for(let i = 0; i < invitations.length; i++){
      if(i === props.invitation - 1){
        setInvitation(invitations[i]);
      }
    } 
  }
  
  HOME.JSX MARKUP CODE
  props.invitation?
    <>
      <iframe src={invitations[props.invitation - 1]} ></iframe>
    </>:
    <></>

  PATTERN 1: CALL FROM FUNCTION DEFINITION

  getInvitation()

  async function getInvitation(){
    if(authUser?.email && !invite){

      const { docs } = await getDocs(collection(db, "guestlist"));
      
      let found;
      
      docs.map((rawList) => {
        let list = rawList.data();
        if(list.guests.filter((guest) => {return guest === authUser.email}).length > 0){
          found = list.document;
        }
        console.log(list.document, found);
      })
      console.log("Invite is ", found);
      setInvite(found);
    }
  }
    

  
  PATTERN 2: CALL FROM FIRST USEEFFECT (AUTHENTICATION) HOOK

  async function getInvitation(user){
    const { docs } = await getDocs(collection(db, "guestlist"));
    
    let found;
    
    docs.map((rawList) => {
      let list = rawList.data();
      if(list.guests.filter((guest) => {return guest === user.email}).length > 0){
        found = list.document;
      }
      console.log(list.document, found);
    })
    console.log("Invite is ", found);
    setInvite(found);
  }

  useEffect(() => {
  
    onAuthStateChanged(auth, (user) => {
      console.log("App auth has changed", user);
      if(user){
        console.log("user is defined")
        setAuthUser(user);
        getInvitation(user);
      }
      else{
        setAuthUser({});
        console.log("user is null");
        navigate("/login");
      }
    })
  }, [])



  PATTERN 3: CALL FROM SECOND USEEFFECT (DATA RETRIEVAL) HOOK

  async function getInvitation(){
      const { docs } = await getDocs(collection(db, "guestlist"));
      
      let found;
      
      docs.map((rawList) => {
        let list = rawList.data();
        if(list.guests.filter((guest) => {return guest === authUser.email}).length > 0){
          found = list.document;
        }
        console.log(list.document, found);
      })
      console.log("Invite is ", found);
      setInvite(found);
  }

  useEffect(() => {
    
    if(authUser?.email){
      console.log("In the second useeffect where authuser has changed")
      getInvitation();
    }
  }, [authUser])
  
  
  
  PATTERN 4: DATA RETRIEVAL FUNCTION IN APP.JSX 
              CALLED FROM HOME.JSX FUNCTION DEFINITION

  HOME.JSX CALL FROM FUNCTION DEFINITION
  if(props.user?.email){
    props.getInvite()
      .then((invite) => {
        setInvitation(invitations[invite-1]);
      })
  }

  HOME.JSX MARKUP CODE
  <iframe src={invitation} ></iframe>

  DATA RETRIEVAL IN APP.JSX
  async function getInvitation(){
      const { docs } = await getDocs(collection(db, "guestlist"));
      
      let found;
      
      docs.map((rawList) => {
        let list = rawList.data();
        if(list.guests.filter((guest) => {return guest === authUser.email}).length > 0){
          found = list.document;
        }
        console.log(list.document, found);
      })
      console.log("Invite is ", found);
      return found;
  }
  
  

  PATTERN 5: HOME.JSX CALL FROM USEEFFECT DATA RETRIEVAL HOOK

  HOME.JSX CALL FROM USEEFFECT DATA RETRIEVAL HOOK
  useEffect(() => {
    console.log("Homepage User is now ", props.user)
    props.getInvite().then((invite) => {
      setInvitation(invitations[invite-1]);
    });

  }, [props.user])

  HOME.JSX MARKUP CODE
  <iframe src={invitation} ></iframe>

  async function getInvitation(){
      const { docs } = await getDocs(collection(db, "guestlist"));
      
      let found;
      
      docs.map((rawList) => {
        let list = rawList.data();
        if(list.guests.filter((guest) => {return guest === authUser.email}).length > 0){
          found = list.document;
        }
        console.log(list.document, found);
      })
      console.log("Invite is ", found);
      return found;
  }

  
  */

  /* RETRIEVES INVITATION VERSION NUMBER FOR USER 
    Retrieves lists of guests from database. Lists
    are organized by version number, and each email
    in the list receives that invitation version.

    Finds the version number for this particular user

    Returns the version number
  */
  async function getInvitation(){
    console.log("getInvite User is now ", authUser)
    
    //Gets lists of all guests
    const { docs } = await getDocs(collection(db, "guestlist"));
    
    //Declare variable to record invitation version number
    let found;
    console.log("Finding this email ", authUser.email)

    //Go through the lists to find invitation version number for user
    docs.map((rawList) => {
      let list = rawList.data();
      console.log("list is ", list)
      if(list.guests.find((guest) => {return guest === authUser.email})){
        found = list.document;
      }
      console.log(list.document, found);
    })
    console.log("Invite is ", found);
    return found;
  }

  /* USEEFFECT HOOK FOR AUTHENTICATION */
  useEffect(() => {
    
    /* IF USER IS LOGGED IN, SET STATE VARIABLE TO USER
    IF NO ONE HAS LOGGED IN, REDIRECT USER TO LOGIN SCREEN */
    onAuthStateChanged(auth, (user) => {
      console.log("App auth has changed", user);
      if(user){
        console.log("user is defined")
        setAuthUser(user);
      }
      else{
        setAuthUser({});
        console.log("user is null");
        navigate("/login");
      }
    })
  }, [])
  
  return (
    
      <div>
        <ToastContainer theme="dark"/>
        
          <Routes>
            <Route path="/" element={<Home user={authUser} getInvite={getInvitation} />} />
            <Route path="/login" element={<Login auth={auth} db={db} />} />
          </Routes>
        
      </div>
    
  )
}

export default App
