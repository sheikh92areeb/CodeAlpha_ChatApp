import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';

const ProfilePage = () => {

  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState('Areeb Sheikh')
  const [bio, setBio] = useState("Hi Everyone, I am using QuickChat")


  return (
    <div className='flex bg-cover bg-no-repeat min-h-screen items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between rounded-lg max-sm:flex-col-reverse'>
        <form className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=> setSelectedImage(e.target.files[0])} type="file" id="avatar" accept='image/jpg, image/jpeg, image/png' hidden />
            <img src={selectedImage ? URL.createObjectURL(selectedImage): assets.avatar_icon} alt="profile image" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            upload profile image
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" required placeholder='Your Name' className='p-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
          <textarea onChange={(e)=> setBio(e.target.value)} value={bio} placeholder='Write Profile bio...' required className='p-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4} ></textarea>
        </form>
        <img src="" alt="" />
      </div>  
    </div>
  )
}

export default ProfilePage
