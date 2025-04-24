import React, { useState, useRef} from 'react'
import Header from './header'
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile,} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
   function Login() {
   const [isSignInForm, setIsSignInForm] = useState(true);
   const [errorMessage, setErrorMessage] = useState(null);
   const dispatch = useDispatch();
    const navigate = useNavigate();

    const name = useRef(null);
   const email = useRef(null);
   const password = useRef(null);

   function handleButtonClick(){

     const message = checkValidData(email.current.value,password.current.value);
     setErrorMessage(message);
     if(message) return;
     
     // Perform sign in or sign up action here
      if(!isSignInForm){
        //sign Up Logic
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?semt=ais_hybrid&w=740",
    
    
  }).then(() => {
    const {uid,email,displayName,photoURL} = auth.currentUser;
    dispatch(addUser({uid: uid,email: email,displayName: displayName, photoURL: photoURL,}));
              
    navigate("/browse");
 
  }).catch((error) => {
    setErrorMessage(error.message);
  });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
     
   } else{
        //sign In Logic
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);  
    navigate("/browse");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
     });
   }
  }
   function toggleSignInForm(){
    setIsSignInForm(!isSignInForm);
   }
   
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_small.jpg" alt="logo" />
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className='w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg '>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
      {!isSignInForm && (<input ref={name} type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-900'/>)}
        <input ref={email} type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-900'/>
        <input ref={password} type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-900'/>
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 rounded-lg w-full' onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix?Sign Up Now.":"Already Resistered?Sign In Now."}</p>
      </form>
    </div>
  )
}

export default Login