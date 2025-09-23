import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const AuthScreen = () => {

    const [email, setEmail] = useState('');

  return (
    <div className='hero-bg_2 '>

        {/* NavBar */}

        <header className=" relative w-full p-4 pl-12 flex items-center ">
            <img src="/netflix-logo.png" alt="Logo" className="w-52" />

            <Link
                to="/login"
                className="absolute left-1/2 -translate-x-1/2 p-2 bg-red-600 rounded text-white font-semibold hover:bg-red-500 hover:scale-105 transition-all duration-200 ease-in-out"
            >
                Sign In
            </Link>
        </header>

        {/* Hero Section */}

        <div className="flex flex-col justify-center items-center text-white mx-auto py-40 max-w-6xl ">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                Welcome to <span className="text-red-600">Netflix</span>
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl">
                Unlimited movies, TV shows, and more.
            </p>

            <p className="mt-2 text-lg md:text-xl text-gray-300">
                Watch anywhere. Cancel anytime.
            </p>

            <form className="flex flex-col md:flex-row gap-4 w-1/2">
                <input
                    type="email"
                    placeholder="Email address"
                    className="p-2 rounded flex-1 bg-black/80 border border-gray-700 "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="text-1 bg-red-600 lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center text-white hover:bg-red-500 active:scale-95 transition-transform duration-200 shadow-lg">       
                    Get Started
                    <ChevronRight className="size-8 md:size-10" />
                </button>
            </form>
        </div>


        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>


        {/* 1st section */}
        <div className="py-10 bg-black text-white">
            <div className='flex max-w-6xl  mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 '>
                {/* Left Side */}
                <div className='flex-1 text-center md:text-left'> 
                    <h1 className='text-4xl md:text-5xl font-bold'>Enjoy on your TV.</h1>
                    <p className='text-xl md:text-2xl mt-4 text-gray-300'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                </div>
                {/* Right Side */}
                <div className="flex-1 relative flex justify-center items-center">
                    <div className="relative">
                        <img
                        src="/tv.png"
                        alt="TV image"
                        className="relative z-10 mx-auto"
                        />
                        <video
                        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[75%] z-0"
                        playsInline
                        autoPlay
                        muted
                        loop
                        >
                            <source src="/hero-vid.m4v" type="video/mp4" />
                        </video>
                    </div>
                </div>

            </div>
        </div>


        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>


        {/* 2nd section */}
        <div className="py-10 bg-black text-white">
            <div className='flex max-w-6xl  mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>

                {/* Left Side */}
                <div className='flex-1'>
                    <div className=' relative'>
                        <img src='/stranger-things-lg.png' alt='Stranger Things Img' className='mt-4'/>
                        <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black 
                        w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                            <img src='/stranger-things-sm.png' alt=' Img' className='h-full' />
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex flex-col gap-0'>
                                    <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                                    <span className='text-sm text-blue-500'>Downloading...</span>
                                </div>

                                <img src='/download-icon.gif' alt=' icon' className='h-12' />

                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex-1 '>
                    <h1 className='text-4xl md:text-5xl font-bold text-center md:text-left'>Download your shows to watch offline.</h1>
                    <p className='text-xl md:text-2xl mt-4 text-gray-300 text-center md:text-left'>Save your favorites easily and always have something to watch.</p>
                </div>
            </div>
        </div>


        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>


        {/* 3rd section */}
                <div className="py-10 bg-black text-white">
            <div className='flex max-w-6xl  mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 '>
                {/* Left Side */}
                <div className='flex-1 text-center md:text-left'> 
                    <h1 className='text-4xl md:text-5xl font-bold'>Watch everywhere</h1>
                    <p className='text-xl md:text-2xl mt-4 text-gray-300'>Stream on any device, including Smart TVs, game consoles, and mobile phones.</p>
                </div>
                {/* Right Side */}
                <div className="flex-1 relative flex justify-center items-center">
                    <div className="relative">
                        <img
                        src="/device-pile.png"
                        alt="Device image"
                        className="relative z-10 mx-auto"
                        />
                        <video
                        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[75%] z-0"
                        playsInline
                        autoPlay
                        muted
                        loop
                        >
                            <source src="/video-devices.m4v" type="video/mp4" />
                        </video>
                    </div>
                </div>

            </div>
        </div>


        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>


        {/* 4th section */}
        <div className="py-10 bg-black text-white">
            <div className='flex max-w-6xl  mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>

                {/* Left Side */}
                <div className='flex-1'>
                    <div className=' relative'>
                        <img src='/kids.png' alt='Kids Img' className='mt-4'/>
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex-1 '>
                    <h1 className='text-4xl md:text-5xl font-bold text-center md:text-left'>Create profiles for kids.</h1>
                    <p className='text-xl md:text-2xl mt-4 text-gray-300 text-center md:text-left'>Give kids their own space to play and explore.</p>
                </div>
            </div>
        </div>


        {/* Separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>


        {/* footer */}


    </div>
)
}

export default AuthScreen
