import { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currentState, setCurrentState] = useState('Sign Up')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
        {/* LEFT */}
        <img src={assets.logo_big} alt="Logo" className='w-[min(30vw,250px)]' />

        {/* RIGHT */}
        <form className='border-2 bg-white/8 text-white border-e-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl flex items-center justify-between'>
            {currentState}
            <img src={assets.arrow_icon} alt="arrow icon" className='w-5 cursor-pointer' />
          </h2>

          {currentState === 'Sign Up' && !isDataSubmitted && (
            <input onChange={(e)=>setFullname(e.target.value)} value={fullname} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
          )}

          {!isDataSubmitted && (
            <> 
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
            </>
          )}

          {currentState === 'Sign Up' && isDataSubmitted && (
            <textarea onChange={(e)=> setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required placeholder='provide a short bio...'></textarea>
          )}

        </form>
    </div>
  )
}

export default LoginPage
