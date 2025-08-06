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

// A simple test route to see if the server itself is alive
app.get('/api', (req, res) => {
  res.send('BudgetBuddy API is running correctly.');
});

app.use('/api/transactions', transactionRoutes);

module.exports = app;