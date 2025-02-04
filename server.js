const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Initialize app first

// Middleware
app.use(express.json()); // Allows JSON parsing

// CORS Setup (Allow all origins for development; restrict in production)
const allowedOrigins = [
    "https://travel-planner-frontend-rouge.vercel.app", // Vercel frontend URL (without trailing slash)
    "http://localhost:3000" // Local development for frontend (if applicable)
];

const corsOptions = {
    origin: allowedOrigins, // Allow only these origins
    methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
    credentials: true, // Allow cookies and authorization headers
};

// Apply CORS middleware after initializing `app`
app.use(cors(corsOptions));

// Connect to MongoDB Atlas (Replace with your actual credentials)
const mongoURI = "mongodb+srv://sujith_k:sujithk@cluster0.rxocj.mongodb.net/travelPlanner?retryWrites=true&w=majority&appName=Cluster0"; 
mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Example Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Dummy authentication (Replace with real DB check)
    if (username === "user" && password === "password") {
        res.json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Example Trip Planning Route
app.post("/plan-trip", (req, res) => {
    const { destination, dates } = req.body;

    if (!destination || !dates) {
        return res.status(400).json({ message: "Missing destination or dates" });
    }

    res.json({ message: "Trip planned successfully!", destination, dates });
});

// Default Route (To check if backend is running)
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
