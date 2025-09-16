// Import required packages
const express = require('express');
const http = require('http'); // Import http
const { Server } = require("socket.io"); // Import Server from socket.io
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const projectRoutes = require('./routes/projectRoutes'); // Import project routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

// Initialize dotenv to use environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express app instance
const app = express();
const server = http.createServer(app); // Create http server

// Define CORS Options
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow deployed site or local dev
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Initialize socket.io with CORS configuration
const io = new Server(server, {
  cors: corsOptions
});

// Define the port from environment variables, with a fallback to 5001
const PORT = process.env.PORT || 5001;

// --- Middlewares ---
// Enable CORS for all routes
app.use(cors(corsOptions));
// Allow the app to parse JSON from request bodies
app.use(express.json());

// Middleware to make `io` accessible from controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// --- Socket.io Connection Logic ---
io.on('connection', (socket) => {
  console.log('🔌 A user connected:', socket.id);

  // Listener for a client to join a project-specific room
  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined project room ${projectId}`);
  });

  socket.on('disconnect', () => {
    console.log('🔥 A user disconnected:', socket.id);
  });
});

// --- Routes ---
// A simple test route to check if the server is running
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

// Mount the user routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes); // Mount project routes
app.use('/api/tasks', taskRoutes); // Mount task routes

// Change app.listen to server.listen
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// --- Server Listener ---
// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});