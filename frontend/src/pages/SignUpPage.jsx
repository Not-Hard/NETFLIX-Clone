import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser.js'

function SignUpPage() {


  const {searchParams} = new URL(window.location.href);
  const emailFromQuery = searchParams.get('email');

  const [email, setEmail] = useState(emailFromQuery || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useAuthStore();


  const handleSignUp = (e) => {
    e.preventDefault();// Prevent default form submission
    signup({ email, username, password });
  };

  return <div className='hero-bg'>
    <header className=' w-full mx-auto flex items-center justify-between p-4 pl-12 '>
      <Link to={"/"}>
        <img src="/netflix-logo.png" alt="Logo" className='w-52' />
      </Link>
    </header>

    <div className='flex justify-center items-center mt-20 mx-3' >
      <div className='w-full max-w-md bg-black/50 p-8 shadow-md space-y-6 rounded-lg'>
        <h1 className='text-center font-bold text-2xl text-white mb-4'>Sign Up</h1>

        <form className='space-y-4' onSubmit={handleSignUp}>
          <div>
            <label className='text-white mb-2 block' htmlFor="email">Email</label>
            <input 
              type="email" 
              placeholder='you@example.com' 
              className='w-full p-3 rounded bg-gray-700 text-white focus:outline-none'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>

          <div>
            <label className='text-white mb-2 block' htmlFor="username">Username</label>
            <input 
              type="text" 
              placeholder='Zenitsu' 
              className='w-full p-3 rounded bg-gray-700 text-white focus:outline-none'
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  
            />
          </div>

          <div>
            <label className='text-white mb-2 block' htmlFor="password">Password</label>
            <input 
              type="password" 
              placeholder='*******' 
              className='w-full p-3 rounded bg-gray-700 text-white focus:outline-none'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
          </div>

          <button type="submit" className='w-full p-3 rounded-md transition-all duration-200 ease-in-out bg-red-600 text-white hover:bg-red-500 hover:scale-105 font-semibold'>Sign Up</button>
        </form>
        <div className='text-white mt-4'>
          Already have an account? <Link to={"/login"} className='text-blue-500 hover:underline'>Log In</Link>
        </div>
      </div>
    </div>
  </div>
  
}

export default SignUpPage
