import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/authUser.js'

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    login({email, password});
  }

  return <div className='hero-bg'>
    <header className=' w-full mx-auto flex items-center justify-between p-4 pl-12 '>
      <Link to={"/"}>
        <img src="/netflix-logo.png" alt="Logo" className='w-32 md:w-40' />
      </Link>
    </header>

    <div className='flex justify-center items-center mt-20 mx-3 '>
      <div className='w-full max-w-md bg-black/50 p-8 shadow-md space-y-6 rounded-lg'>
        <h1 className='text-center font-bold text-2xl text-white mb-4'>Log In</h1>

        <form className='space-y-4' onSubmit={handleSubmit}>
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

          <button type="submit" className='w-full p-3 rounded bg-red-600 text-white hover:bg-red-500 transition'>Log In</button>

        </form>

        <div className='text-white mt-4'>
          New to the best streaming platform? <Link to={"/signup"} className='text-blue-500 hover:underline'>Sign Up</Link>
        </div>

      </div>
    </div>
  </div>
}

export default LoginPage