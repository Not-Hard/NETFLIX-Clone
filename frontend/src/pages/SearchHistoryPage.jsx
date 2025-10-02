import { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from '../components/NavBar.jsx';
import { SMALL_IMAGE_URL } from '../utils/constants.js';
import { Trash } from 'lucide-react';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}



const SearchHistoryPage = () => {

  const [searchHistory, setSearchHistory] = useState([]);

  
  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await axios.get(`/api/v1/search/history`);
        setSearchHistory(response.data.content);
      } catch (error) {
        console.error("Error fetching search history:", error);
        setSearchHistory([]);
      }
    };
    fetchSearchHistory();
  }, []);

  if(searchHistory?.length === 0){
    return (
      <div className='bg-black min-h-screen text-white'>
        <NavBar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-4'>Search History</h1>
          <div className='flex justify-center items-center h-96'>
            <p className='text-gray-400'>No search history found.</p>
          </div>
        </div>
      </div>
    )
  }

  const handleDelete = async (item) => {
    try {
      await axios.delete(`/api/v1/search/history/${item.id}`);
      setSearchHistory((prev) => prev.filter((historyItem) => historyItem.id !== item.id));
    } catch (error) {
      console.error("Error deleting search history item:", error);
    }
  };

  return (
    <div className='bg-black min-h-screen text-white'>
      <NavBar />
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>Search History</h1>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {searchHistory?.map((item) => (
            <div 
            key={item.id} 
            className='bg-gray-800 p-4 rounded flex items-start'
            >
              <img 
                src={SMALL_IMAGE_URL + item.image} 
                alt={"history Image"}
                className='size-16 rounded-full object-cover mr-4'
              />
              <div className='flex flex-col'> 
                <span className='font-semibold'>{item.title}</span>
                <span className='text-sm text-gray-400'>{formatDate(item.createdAt)}</span>
              </div>

              <span
                className={`text-sm px-3 py-1 rounded-full text-center ml-auto min-w-20
                  ${item.type === 'movie' 
                    ? 'bg-red-600' 
                    : item.type === 'tv' 
                    ? 'bg-blue-600' 
                    : 'bg-green-600'
                  }
                  `}
              >
                {item.type[0].toUpperCase() + item.type.slice(1)}
              </span>

              <Trash 
                className='size-5 ml-4 cursor-pointer text-gray-400 hover:fill-red-500 hover:text-red-500'
                onClick={() => handleDelete(item)}
                  
                />
            </div>
          ))}
         </div>
      </div>
    </div>
  )
}

export default SearchHistoryPage