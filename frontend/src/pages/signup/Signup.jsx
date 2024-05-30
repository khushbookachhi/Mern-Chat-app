import React from 'react'
import GenderCheckBox from './GenderCheckBox'

function Signup() {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding 
      backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Sign Up
        <span className='text-blue-500'> ChatApp</span>
        </h1>
        {/* form for Signup  */}
        <form>
            {/* input for fullname  */}
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Full Name</span>
                </label>
                <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10'/>
            </div>
            {/* input for username  */}
            <div>
                <label className='label'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder='JohnDoe' className='w-full input input-bordered h-10'/>
            </div>
              {/* input for password  */}
              <div>
                <label className='label'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10'/>
            </div>
              {/* input for confirmPassword  */}
              <div>
                <label className='label'>
                    <span className='text-base label-text'>Confirm Password</span>
                </label>
                <input type="password" placeholder='confirm password' className='w-full input input-bordered h-10'/>
            </div>
            {/* gender checkbox  */}
            <GenderCheckBox/>
            <div></div>
            <a href="#" className='text-sm text-left hover:underline hover:text-blue-600 mt-2 inline-block'>
                Already have an account?
            </a>
            <div>
                <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
            </div>
        </form>
      </div>

    </div>
  )
}

export default Signup
