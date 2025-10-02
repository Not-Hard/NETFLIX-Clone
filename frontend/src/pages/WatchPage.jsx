import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player/lazy";

import { formattingReleaseDate, formattingRuntime } from "../utils/formatting.js";
import { ORIGINAL_IMAGE_URL } from "../utils/constants.js";
import WatchPageSkeleton from "../components/skeleton/WatchPageSkeleton.jsx";
import NavBar from "../components/NavBar.jsx";
import { useContentStore } from "../store/content.js";



function WatchPage() {
    const {id} = useParams();
    const [ trailers, setTrailers ] = useState([]);
    const [ currentTrailerIndex, setCurrentTrailerIndex ] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);
    const { contentType } = useContentStore();

    const sliderRef = useRef(null);

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(response.data.trailers);
            } catch (error) {
                if(error.response.status === 404) {
                    setTrailers([]);
                }
                console.error("Error fetching content details:", error);
            }
        };
        getTrailers();

    }, [id, contentType]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(response.data.similar);
            } catch (error) {
                if(error.response.status === 404) {
                    setSimilarContent([]);
                }
                console.error("Error fetching similar content:", error);
            }
        };
        getSimilarContent();

    }, [id, contentType]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(response.data.details);
            } catch (error) {
                if(error.response.status === 404) {
                    setContent(null);
                }
                console.error("Error fetching content details:", error);
            }finally {
                setLoading(false);
            }
        };
        getContentDetails();

    }, [id, contentType]);

    const HandlePreviousTrailer = () => {
        setCurrentTrailerIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }

    const HandleNextTrailer = () => {
        setCurrentTrailerIndex((prevIndex) => Math.min(prevIndex + 1, trailers.length - 1));
    }

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

    if (loading) {
        return (
            <div className="min-h-screen bg-black p-10">
                <WatchPageSkeleton />
            </div>
        );
    }

    if(!loading && !content) {
        return (
            <div
            className="min-h-screen bg-black bg-center bg-cover flex flex-col items-center justify-center p-4 relative"
            style={{ backgroundImage: "url('/download.png')" }}
            >
                <div className="absolute inset-0 bg-black/70"/>
                <div className="relative z-10 flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-2 text-white">Content Not Found</h3>
                    <h2 className="mb-4 text-center text-white">
                    We couldn't find the content you're looking for. It might have been removed or is unavailable.
                    </h2>
                    <Link to="/" className="text-blue-500 hover:underline mb-8">
                    Go back to Home
                    </Link>
                </div>
            </div>
        );
    }

  return (
    <div className="bg-black text-white min-h-screen">
        <div className="mx-auto container px-4 py-8 h-full">
            <NavBar />
                {trailers.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <button 
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded
                             ${currentTrailerIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                             disabled={currentTrailerIndex === 0}
                                onClick={HandlePreviousTrailer}
                            >
                            <ChevronLeft size={24}/>

                        </button>

                         <button 
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded
                             ${currentTrailerIndex === trailers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                             disabled={currentTrailerIndex === trailers.length - 1}
                             onClick={HandleNextTrailer}
                            >
                            <ChevronRight size={24}/>
                        </button>

                    </div>

                )}

                {trailers.length === 0 && (
                    <p className="text-center my-10">No trailers available for this content.</p>
                )}


                <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                    {trailers.length > 0 && (
                        <ReactPlayer 
                        controls={true}
                         width="100%"
                         height="70vh"
                         className="mx-auto overflow-hidden rounded-lg"
                         url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
                         />
                    )}
                </div>

                {/* Content Details Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-3xl font-bold text-balance">
                            {loading ? 'Loading...' : content ? (content.title || content.name) : 'Content Not Found'}
                        </h2>

                        <p className="mt-2 text-lg">
                            {formattingReleaseDate(content.release_date || content.first_air_date)} 
                             {content.runtime ? `| ${formattingRuntime(content.runtime)}` : ''}
                        </p>

                        <p className="mt-4 max-w-2xl text-justify">
                            {loading ? 'Loading description...' : content ? content.overview : 'No description available.'}
                        </p>
                    </div>
                    <img src={ORIGINAL_IMAGE_URL + content.poster_path} alt=" Poster Image" 
                    className="max-h-[600px] rounded-md"/>
                </div>
                
                {/* Similar Content Section */}
                {similarContent.length > 0 && (
                    <div className="mt-12" >
                        <h3 className="text-2xl font-bold mb-4">Similar {contentType === 'movie' ? 'Movies' : 'TV Shows'}</h3>
                        <div className="relative">
                            <div className="flex overflow-x-scroll gap-4 pb-4 group" ref={sliderRef}>
                                {similarContent.map((content) => {
                                    if(!content.poster_path) return null;
                                    return (
                                    <Link to={`/watch/${content.id}`} className="min-w-[200px] md:min-w-[250px] lg:min-w-[300px] relative group" key={content.id}>
                                        <img src={ORIGINAL_IMAGE_URL + content?.poster_path} alt="Poster path" className="w-full h-auto rounded-md" />
                                        <h4 className="mt-2 text-lg font-semibold">{content.title || content.name}</h4>
                                    </Link>
                                    )
                                })}
                                
                                <ChevronLeft size={24}
                                    className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all
                                    duration-300 cursor-pointer bg-red-600 text-white rounded-full flex items-center justify-center"
                                    onClick={scrollLeft}
                                />
                                <ChevronRight size={24}
                                    className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all
                                    duration-300 cursor-pointer bg-red-600 text-white rounded-full flex items-center justify-center"
                                    onClick={scrollRight}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchPage