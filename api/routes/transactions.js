// api/routes/transactions.js
const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transaction.controller');

router.route('/').get(getTransactions).post(addTransaction);
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

module.exports = router;