// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');

dotenv.config();
connectDB();

const app = express();

// --- THE DEFINITIVE CORS FIX ---
// This tells your API to ONLY accept requests from your deployed frontend.
// IMPORTANT: Replace the URL with your actual frontend URL if it's different.
const allowedOrigins = ['https://budgetbuddy-deploy.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

// Middleware for parsing JSON
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
  res.send('BudgetBuddy API is running and configured correctly.');
});
app.use('/api/transactions', transactionRoutes);

// Export the app for Vercel's serverless environment
module.exports = app;