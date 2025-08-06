// api/models/transaction.model.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: [true, 'Please add a description'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
      required: [true, 'Please specify a type'],
    },
    category: {
      type: String,
      enum: [ 'Food', 'Rent', 'Entertainment', 'Salary', 'Transportation', 'Other' ],
      required: [true, 'Please select a category'],
    },
    isCleared: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// This prevents Mongoose from trying to re-compile the model if it already exists,
// which can happen in serverless environments.
module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);