import React from 'react'

import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
function Header() {
  const navigate = useNavigate();
  const user = useSelector(store=>(store.user));
  function handleSignOut(){
    const auth = getAuth();
signOut(auth).then(() => {
  navigate("/")
}).catch((error) => {
  navigate("/error")
});
  } 
  return (
    <div className='absolute px-40 py-7 w-screen bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-35' src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460" alt="logo" />
      {user && (<div className='flex p-2'>
        <img src={user?.photoURL} alt="usericon" className='w-12 h-12' />
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>(Sign Out)</button>
      </div>)}
    </div>
  )
}

export default Header