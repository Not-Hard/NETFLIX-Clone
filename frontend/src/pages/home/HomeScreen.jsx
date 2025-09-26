import React from 'react'
import NavBar from '../../components/NavBar.jsx'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'


const HomeScreen = () => {

  return (
    <>
    <div className='relative h-screen text-white '>
      <NavBar />

      <img src="/inter.png" alt="Hero img" className='absolute top-0 left-0 w-full h-full object-cover -z-50' />
      <div className='absolute top-0 left-0 w-full h-full -z-50 bg-black/50' 
        aria-hidden="true"
      />
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 '>
        <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-10'/>

        <div className='max-w-2xl '>
          <h1 className='mt-4 text-6xl font-extrabold text-balance'>Interstellar</h1>
          <p className='mt-2 text-lg '>2014 ‧ Science Fiction/Adventure</p>
          <p className='mt-4 text-lg '>A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</p>
        </div>

        <div className='flex mt-8'>
          <Link to={"/watch/123"} className='bg-white hover:bg-white/80 font-bold mr-4 flex items-center px-4 py-2 text-black rounded'>
            <Play className='size-6 inline-block mr-2 fill-black' />
            Play
          </Link>

          <Link to={"/watch/123"} className='bg-white hover:bg-white/80 font-bold mr-4 flex items-center px-4 py-2 text-black rounded'>
            <Play className='size-6 inline-block mr-2 fill-black' />
            Trailer
          </Link>
 
          
          <Link to={"/watch/123"} className='bg-grey-500/70 text-white hover:bg-grey-500  rounded items-center flex px-4 py-2 '>
            <Info className='size-6 mr-2' />
            More Info
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomeScreen