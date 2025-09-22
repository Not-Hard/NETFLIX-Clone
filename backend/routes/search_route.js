import express from 'express';
import { searchPerson, searchMovie, searchTvShow } from '../controllers/search_controller.js';

const router = express.Router();

// Example search route
router.get('/person/:query', searchPerson);
router.get('/movie/:query', searchMovie);
router.get('/tvshow/:query', searchTvShow);



export default router;