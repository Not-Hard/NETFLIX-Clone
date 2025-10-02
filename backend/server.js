import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

import { protectRoute } from './middleware/protectRoute.js';

import authRoutes from './routes/auth_route.js';
import movieRoutes from './routes/movie_route.js';
import tvShowRoutes from './routes/tvshow_route.js';
import searchRoutes from './routes/search_route.js';

const app = express();

const PORT = ENV_VARS.PORT;

// Means we are under the root directory
const __dirname = path.resolve();

app.use(express.json()); //Allow to parse req.body
app.use(cookieParser()); // Allow to parse cookies

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tvshow", protectRoute, tvShowRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Serve static files in production
if (ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});
