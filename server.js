require("dotenv").config({ quiet: true });
const path = require('path');
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ["https://meeting-app-reactjs.onrender.com"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/participants', require('./routes/participantRoutes'));
app.use('/api/meetings', require('./routes/meetingRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(errorHandler)

// 🔹 Serve React frontend
const buildPath = path.join(__dirname, "client", "dist");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
