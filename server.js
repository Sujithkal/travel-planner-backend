const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Initialize Express app

// ✅ Middleware (allows parsing JSON)
app.use(express.json());

// ✅ Fix CORS (Allow Frontend on Vercel)
const allowedOrigins = [
    "https://travel-planner-frontend-rouge.vercel.app",  // 🚀 Your actual Vercel frontend URL
    "http://localhost:3000"  // ✅ Allow local development
];

const corsOptions = {
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

app.use(cors(corsOptions));  // Apply CORS Fix

// ✅ Connect to MongoDB Atlas (Use your real MongoDB URL)
const mongoURI = "mongodb+srv://sujith_k:sujithk@cluster0.rxocj.mongodb.net/travelPlanner?retryWrites=true&w=majority&appName=Cluster0"; 
mongoose
    .connect(mongoURI)
    .then(() => console.log("🎉 MongoDB connected successfully!"))
    .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Example Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Dummy authentication (Replace with real DB check)
    if (username === "user" && password === "password") {
        res.json({ message: "✅ Login successful!" });
    } else {
        res.status(401).json({ message: "❌ Invalid credentials" });
    }
});

// ✅ Example Trip Planning Route
app.post("/plan-trip", (req, res) => {
    const { destination, dates } = req.body;

    if (!destination || !dates) {
        return res.status(400).json({ message: "❌ Missing destination or dates" });
    }

    res.json({ message: "✅ Trip planned successfully!", destination, dates });
});

// ✅ Test Route (Check if Backend Works)
app.get("/", (req, res) => {
    res.send("🎉 Backend is running...");
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
