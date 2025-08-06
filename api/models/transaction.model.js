// models/transaction.model.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true, // Removes whitespace from both ends
      required: [true, 'Please add a description'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a positive or negative number'],
    },
    type: {
      type: String,
      enum: ['Income', 'Expense'], // Only these values are allowed
      required: [true, 'Please specify the type (Income or Expense)'],
    },
    category: {
      type: String,
      enum: [
        'Food',
        'Rent',
        'Entertainment',
        'Salary',
        'Transportation',
        'Other',
      ],
      required: [true, 'Please select a category'],
    },
    isCleared: {
      type: Boolean,
      default: false,
    },
    // --- ADD THIS FIELD ---
    date: {
      type: Date,
      default: Date.now, // Defaults to the creation date
    }
    // We don't need a separate 'date' field because of the 'timestamps' option below
  },
  {
    // This option automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Create the model from the schema and export it
module.exports = mongoose.model('Transaction', transactionSchema);