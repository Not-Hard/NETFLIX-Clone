import express from 'express';
import { searchPerson, searchMovie, searchTvShow, getSearchHistory, deleteSearchHistoryItem } from '../controllers/search_controller.js';

const router = express.Router();

// Example search route
router.get('/person/:query', searchPerson);
router.get('/movie/:query', searchMovie);
router.get('/tvshow/:query', searchTvShow);

router.get('/history', getSearchHistory);

router.delete('/history/:id', deleteSearchHistoryItem);



export default router;