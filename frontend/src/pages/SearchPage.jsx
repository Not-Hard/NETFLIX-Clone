import { useState } from 'react'
import { useContentStore } from "../store/content.js";
import NavBar from '../components/NavBar.jsx';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ORIGINAL_IMAGE_URL } from '../utils/constants.js';
import { Link } from 'react-router-dom';


function SearchPage() {

    const [activeTab, setActiveTab] = useState('movie');
    const [ searchTerm, setSearchTerm] = useState("");

    const [results, setResults] = useState([]);
    const {setContentType} = useContentStore();

    const handleTabClick = (type) => {
        setActiveTab(type);
        if(type === 'movie'){
            setContentType('movie');
        } else if(type === 'tvshow'){
            setContentType('tvshow');
        }
        setResults([]);
        setSearchTerm("");
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            if(searchTerm.trim() === "") return;
    
            const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            setResults(response.data.content);
        } catch (error) {
            if(error.response && error.response.status === 404) {
                setResults([]);
                toast.error("No results found");
            }else{
                toast.error("An error occurred while searching, please try again later.");
            }
        }
    }
    
  return (
    <div className="bg-black min-h-screen text-white">
        <NavBar />
        <div className='container mx-auto px-4 py-8'>
            <div className='flex justify-center gap-3 mb-4'>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-500`}
                    onClick={() => {handleTabClick('movie')}}
                >
                    Movies
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'tvshow' ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500`}
                    onClick={() => {handleTabClick('tvshow')}}
                >
                    TV Shows
                </button>

                <button
                    className={`px-4 py-2 rounded ${activeTab === 'people' ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500`}
                    onClick={() => {handleTabClick('person')}}
                >
                    Person
                </button>
            </div>
            {/* Search Bar */}
            <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder={"Search for a " + (activeTab === 'movie' ? 'Movies' : activeTab === 'tv' ? 'TV Shows' : 'People')}
                    className='w-full p-2  rounded bg-gray-800 text-white'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                <button className='px-4 py-2 rounded bg-red-600 hover:bg-red-500'>
                    <Search  className='w-6 h-5'/>
                </button>               
            </form>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {results.map((result) => {
                    // Skip rendering if no poster or profile image
                    if(!result.poster_path && !result.profile_path) return null;
                    return (
                        <div key={result.id} className='bg-gray-800 p-4 rounded '>
                            {activeTab === 'person' ? (
                                <div className='flex flex-col items-center'>
                                <img 
                                    src={ORIGINAL_IMAGE_URL + result.profile_path}
                                    alt={result.name}
                                    className='max-h-96 rounded max-auto '
                                />
                                <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
                                </div>
                            ) : (
                                <Link to={`/watch/${result.id}`} >
                                <img 
                                    src={ORIGINAL_IMAGE_URL + result.poster_path}
                                    alt={result.title || result.name}
                                    className='w-full h-auto rounded'
                                />
                                <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
                                </Link>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default SearchPage