require("dotenv").config({ quiet: true });
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
        origin: ["http://localhost:5173", "http://192.168.10.16:5173"],
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

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port http://192.168.10.16:${PORT}`);
});