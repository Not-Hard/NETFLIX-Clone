import { parse } from "dotenv";
import User from "../models/user_model.js";
import { fetchfromTMDB } from "../services/tmbd_services.js"



export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if(data.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: { 
                    id:data.results[0].id,
                    image:data.results[0].profile_path,
                    title:data.results[0].name,
                    type: "person",
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({ success: true, content: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to search person" });
        console.error("Error searching person:", error.message);
    }
} 

export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if(data.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {    
                    id:data.results[0].id,
                    image:data.results[0].poster_path,
                    title:data.results[0].title,
                    type: "movie",
                    createdAt: new Date(),  
                },
            },
        });

        res.status(200).json({ success: true, content: data.results });
    }catch (error) {
        res.status(500).json({ success: false, message: "Failed to search movie" });
        console.error("Error searching movie:", error.message);
    }
}

export async function searchTvShow(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if(data.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id:data.results[0].id,
                    image:data.results[0].poster_path,
                    title:data.results[0].name,
                    type: "tv",
                    createdAt: new Date(),  
                },
            },
        });
        res.status(200).json({ success: true, content: data.results });
    }catch (error) {
        res.status(500).json({ success: false, message: "Failed to search tv show" });
        console.error("Error searching tv show:", error.message);
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch search history" });
        console.error("Error fetching search history:", error.message);
    }
}

export async function deleteSearchHistoryItem(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id : id }
            }
        });


        res.status(200).json({ success: true, message: "Search history item deleted" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete search history item" });
        console.error("Error deleting search history item:", error.message);
    }
}
