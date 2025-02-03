// server.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const allowedHeaders = ['Content-Type', 'Authorization', 'Cache-Control'];

app.use(cors({
  origin: '*', // Allow all origins. Adjust as needed for your application.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: allowedHeaders.join(','), // Allowed headers
  credentials: true, // Allow credentials
  preflightContinue: false, // Passes the response to the next handler
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
  next();
});

app.options('*', (req, res) => {
  res.sendStatus(204);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle any other requests with the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

