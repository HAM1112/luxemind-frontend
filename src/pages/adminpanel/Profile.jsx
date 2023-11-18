import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    
    const userDetails = useSelector(state => state.user.value)

  return (
    <div className="w-full border-4 border-sky-500 p-8">
        <div className='border-2 border-green-500 p-8 bg-gray-400 rounded-xl'>
            {console.log(userDetails)}
            <div className='grid grid-cols-2 gap-5 justify-items-center content-center mt-5'>

                <div className='flex justify-around'>
                    <label>First Name :  </label>
                    <input type="text" name="first_name"  />
                </div>
                <div>
                    <label>Last Name :  </label>
                    <input type="text" name="first_name"  />
                </div>
                <div>
                    <label>Email :  </label>
                    <input type="text" name="first_name"  />
                </div>
                
            </div>
            <div className='flex justify-center pt-5'>
                <button className='bg-sky-600 py-2 px-5 rounded-xl'>Save</button>
            </div>
        </div>
        <div className='flex justify-start gap-8 mt-10 px-1'>
            <button className='bg-zinc-900 text-white py-2 px-5 rounded border-4 hover:border-double' >Logout</button>
            <button className='bg-red-700 text-white py-2 px-5 rounded border-4 hover:border-double'>Delete Account</button>
        </div>
    </div>
  )
}

export default Profile
