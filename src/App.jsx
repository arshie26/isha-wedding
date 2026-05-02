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
  
  const [authUser, setAuthUser] = useState({});

  const navigate = useNavigate();

  

  async function getInvitation(){
    console.log("getInvite User is now ", authUser)
    const { docs } = await getDocs(collection(db, "guestlist"));
    let found;
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

  /* NOT WORKING, RETURNS EMAIL INSTEAD OF DOC NUMBER
  async function getInvitation(){
    console.log("getInvite User is now ", authUser)
    const { docs } = await getDocs(collection(db, "guestlist"));
    let invite = docs.map((rawList) => {
      let list = rawList.data();
      console.log("list is ", list)
      let doc =  list.guests.filter((email) => { 
          if (authUser.email === email) {
            console.log("email is ", email); 
            console.log("List is ", list.document); 
            return list.document;
          }
      });
      console.log(doc);
      
    })
    console.log("Invite is ", invite);
  }
  
  async function getInvitation(){
    console.log("getInvite User is now ", authUser)
    const { docs } = await getDocs(collection(db, "guestlist"));
    let invite = docs.map((rawList) => {
      let list = rawList.data();
      console.log("list is ", list)
      let found =  list.guests.filter((email) => { 
          if (authUser.email === email) {
            console.log("Email is ", email); 
            console.log("List is ", list.document); 
            return true;
          }
      });
      console.log(list.document, found);
      if(found.length > 0){return list.document;}
      
    })
    console.log("Invite is ", invite);
  }
  
  */

  useEffect(() => {
    
    /* IF NO ONE HAS LOGGED IN, REDIRECT USER TO LOGIN SCREEN */
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
  }, [/* AUTHUSER IN DEPENDENCY ARRAY NOT WORKING */])
  
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
