import { useEffect, useState, useRef } from 'react'
import { useContentStore } from "../store/content.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMAGE_URL } from '../utils/constants.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';


function MovieSlider({category}) {

    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef = useRef(null);

    const formattedCategory = category.replace("_", " ").charAt(0).toUpperCase() + category.replace("_", " ").slice(1);
    const formattedContentType = contentType === 'movie' ? 'Movies' : 'TV Shows';


    useEffect(() => {
        const getContent = async () => {
            // Fetch content based on category and contentType
            const res = await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        }
        getContent();
    }, [contentType, category]);

       const scrollLeft = () => {
            if (sliderRef.current) {
                sliderRef.current.scrollBy({
                    left: -sliderRef.current.offsetWidth,
                    behavior: 'smooth'
                });
            }
       }
       const scrollRight = () => {
           if (sliderRef.current) {
               sliderRef.current.scrollBy({
                   left: sliderRef.current.offsetWidth,
                   behavior: 'smooth'
               });
           }
       }

  return (
    <div className="bg-black text-white relative px-5 md:px-20"
    
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}

    >

        <h2 className='text-2xl font-bold my-4'>
            {formattedCategory} {formattedContentType}
        </h2>

        <div className='flex overflow-x-scroll space-x-4 py-4 scrollbar-hidden' ref={sliderRef}>
            {content.map((item) => (
                <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                    <div className='rounded-lg overflow-hidden'> 
                        <img 
                        src={SMALL_IMAGE_URL + item.backdrop_path} 
                        alt="Movie Image"
                        className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                        />
                    </div>
                    <p className='mt-2 items-center text-center text-sm md:text-base'> 
                        {item.title || item.name}
                    </p>
                </Link>
            ))}
        </div>

        {showArrows && (
            <>
                <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-22 flex items-center justify-center
                 bg-black bg-opacity-50 size-12 rounded-full hover:bg-opacity-75 text-white z-10'
                 onClick={scrollLeft}
                 >
                    <ChevronLeft size={24} />
                </button>
                <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center
                 bg-black bg-opacity-50 size-12 rounded-full hover:bg-opacity-75 text-white z-10'
                 onClick={scrollRight}
                >
                    <ChevronRight size={24} />
                 </button>
            </>
                
        )}

    </div>
  )
}

export default MovieSlider