// server.js
const express = require('express');
// const colors = require('colors');
// const morgan = require('morgan');
// const dotenv = require('dotenv');
const cors = require('cors');
const mySqlPool = require('./config/db');

// Load env variables
// dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(express.json());
// app.use(morgan('dev'));
app.use(cors()); // Enable CORS for frontend requests
app.use(express.static(__dirname)); // Serve static files (index.html etc.)

// Load student routes
app.use('/api', require('./router/router'));

// --- Port ---
const port = 5000;

// Start server only after MySQL connection
mySqlPool.query('SELECT 1')
    .then(() => {
        console.log('Mysql connected');
        app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

    })
    .catch(err => {
        console.error('Mysql connection failed:', err);
    });
