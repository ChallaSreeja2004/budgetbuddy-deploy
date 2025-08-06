// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// --- Import the new routes file ---
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('BudgetBuddy API is alive and kicking!');
});

// --- Tell Express to use the transaction routes ---
// Any request that starts with /api/transactions will be handled by this router
app.use('/api/transactions', transactionRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });
module.exports=app;