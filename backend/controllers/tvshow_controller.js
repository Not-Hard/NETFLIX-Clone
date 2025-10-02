import { fetchfromTMDB } from "../services/tmbd_services.js"

export async function getTrendingTVShow(req, res) {
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTVShow = data.results[Math.floor(Math.random() * data.results?.length)];
        res.status(200).json({ success: true, content: randomTVShow});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Failed to fetch trending TV show" });
        console.error("Error fetching trending TV shows:", error);
    }

}

export async function getTVShowTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, trailers: data.results });
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Failed to fetch TV show trailers" });
        console.error("Error fetching TV show trailers:", error.message);
    }
}

export async function getTVShowDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, details: data });
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Failed to fetch TV show details" });
        console.error("Error fetching TV show details:", error.message);
    }
}

export async function getSimilarTVShows(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch similar TV shows" });
        console.error("Error fetching similar TV shows:", error.message);
    }
}

export async function getTVShowsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch TV shows by category" });
        console.error("Error fetching TV shows by category:", error.message);
    }
}
