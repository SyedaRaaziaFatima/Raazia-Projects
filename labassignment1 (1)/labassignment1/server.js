const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session'); // <--- add this
const app = express();
const PORT = 3000;

const bookRoutes      = require('./routes/bookRoutes');
const studentRoutes   = require('./routes/studentRoutes');
const issueRoutes     = require('./routes/issueRoutes');
const returnRoutes    = require('./routes/returnRoutes');
const userRoutes      = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const requestRoutes   = require('./routes/requestRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'mySecretKey123', // change this in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true if using HTTPS
}));

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/books',     bookRoutes);
app.use('/api/students',  studentRoutes);
app.use('/api/issues',    issueRoutes);
app.use('/api/returns',   returnRoutes);
app.use('/api/users',     userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/requests',  requestRoutes);

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});