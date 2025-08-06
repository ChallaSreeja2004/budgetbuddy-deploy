// controllers/transaction.controller.js

const Transaction = require('../models/transaction.model'); // Adjust path as needed


// @desc    Get all transactions (with filtering)
// @route   GET /api/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type && req.query.type !== 'all') {
      filter.type = req.query.type;
    }
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    // --- PAGINATION LOGIC ---
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 5; // Default to 5 items per page
    const skip = (page - 1) * limit; // Calculate how many documents to skip

    // First, get the total count of documents that match the filter
    const total = await Transaction.countDocuments(filter);
    
    // Then, get the paginated documents
    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      count: transactions.length,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
// @desc    Add a transaction
// @route   POST /api/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    // We get the data from the request body
    const { description, amount, type, category } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({ // 201 means "Created"
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ // 400 means "Bad Request"
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Public
exports.updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the new version
            runValidators: true // Run schema validators on update
        });

        if (!transaction) {
            return res.status(404).json({ success: false, error: 'No transaction found' });
        }

        return res.status(200).json({ success: true, data: transaction });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ // 404 means "Not Found"
        success: false,
        error: 'No transaction found',
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {}, // Send back an empty object on successful delete
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};