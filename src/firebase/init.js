// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

//Lets us use Firebase authentication APIs
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDx8Z7jq8IWr2KnJfVueYVI7R1M1NCBHFE",
  authDomain: "isha-wedding.firebaseapp.com",
  projectId: "isha-wedding",
  storageBucket: "isha-wedding.firebasestorage.app",
  messagingSenderId: "124060447236",
  appId: "1:124060447236:web:bee75483bac29a94d53b51"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Gets authentication and database and 
//exports so it can be used in file
export const auth = getAuth();
export const db = getFirestore(app, "guestlist");