import express from 'express';

import { ENV_VARS } from './config/envVars.js';
import authRouter from './routes/auth_router.js';
import { connectDB } from './config/db.js';

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()); //Allow to parse req.body

// Routes
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});

