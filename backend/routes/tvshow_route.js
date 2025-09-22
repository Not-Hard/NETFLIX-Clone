import express from "express";
import { getTrendingTVShow, getTVShowTrailers, getTVShowDetails, getSimilarTVShows, getTVShowsByCategory } from "../controllers/tvshow_controller.js";

const router = express.Router();

// Define TV show-related routes here
router.get("/trending", getTrendingTVShow);
router.get("/:id/trailers", getTVShowTrailers);
router.get("/:id/details", getTVShowDetails);
router.get("/:id/similar", getSimilarTVShows);
router.get("/:category", getTVShowsByCategory);

export default router;