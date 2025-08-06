// api/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

// --- CRITICAL ADDITION: Global Error Handler ---
// This will catch any errors that occur in your controllers
// and send a detailed response, which we can see in the Vercel logs.
app.use((err, req, res, next) => {
  console.error("!!! GLOBAL ERROR HANDLER CAUGHT AN ERROR !!!");
  console.error("ERROR STACK:", err.stack);
  res.status(500).send({ 
    message: 'An unexpected error occurred on the server.',
    error: err.message // Send the actual error message back
  });
});

module.exports = app;