import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';

// Create Express App and HTTP Server
const app = express();
const server = http.createServer(app);

// Middleware Setup 
app.use(express.json({ limit:'4mb' }));
app.use(cors());

app.use('/api/status', (req, res) => res.send("Server is Live"));

// Connect to MongoDB
await connectDB();

const PORT = process.envPORT || 5000;
server.listen(PORT, ()=> console.log("Server is running on PORT: " + PORT));