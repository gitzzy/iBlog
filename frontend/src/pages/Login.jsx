import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [user,setUser] = useState(null)
    const [pass,setPass] = useState(null)

    

    const handleSignin = () => {
        
    }

  return (
    <div className='flex text-white bg-zinc-800 flex-col justify-center h-screen gap-4'>
      <div className='flex justify-center text-[32px]'>Login Page</div>
      <div className='flex justify-center items-center gap-2'>
        Username : <input onChange={(e) => setUser(e.target.value)} type='text' name='username' className='p-2 rounded-md'></input>
      </div>
      <div className='flex justify-center items-center gap-2'>
        Password : <input onChange={(e) => setPass(e.target.value)} type='password' name='password' className='p-2 rounded-md'></input>
      </div>
      <div className='flex justify-center items-center gap-18'>
        <div onClick={handleSignin} className='bg-blue-500 rounded-md w-[100px] flex justify-center items-center h-[40px]'>Login</div>
        <div className='bg-blue-500 rounded-md w-[100px] flex justify-center items-center h-[40px]'><Link to='/api/signup'>Sign Up</Link></div>
      </div>
    </div>
  )
}
