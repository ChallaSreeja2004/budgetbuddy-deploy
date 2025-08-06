// routes/transactions.js
const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transaction.controller'); // Adjust path as needed

// Route for getting all transactions and adding a new one
router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

// Route for updating and deleting a specific transaction by its ID
router
  .route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;