import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LOGO, USER_AVATAR } from "../utils/constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>(store.user));
  function handleSignOut(){
      signOut(auth)
      .then(() => {})
       .catch((error) => {
  navigate("/error")
 });
  } 
  useEffect(()=>{
    const unsudscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid: uid,email: email,displayName: displayName, photoURL: photoURL,}));
      navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
      // Cleanup subscription on unmount
      return () => unsudscribe();
},[])
  return (
    <div className='absolute px-40 py-7 w-screen bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-35' src={LOGO} alt="logo" />
      {user && (<div className='flex p-2'>
        <img   
        className='hidden md:block w-12 h-12' 
        alt="usericon"
        src={user?.photoURL || USER_AVATAR}
        />
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>(Sign Out)</button>
      </div>)}
    </div>
  )
}

export default Header