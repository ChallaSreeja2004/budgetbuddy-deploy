// api/controllers/transaction.controller.js
const Transaction = require('../models/transaction.model');

// This is the stable, simplified controller
exports.getTransactions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type && req.query.type !== 'all') {
      filter.type = req.query.type;
    }
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    const page = parseInt(req.query.page, 10) || 1;
    // The limit is now controlled by the backend, with a reasonable default
    const limit = parseInt(req.query.limit, 10) || 5; 
    const skip = (page - 1) * limit;

    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
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
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.addTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
};

exports.updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!transaction) return res.status(404).json({ success: false, error: 'No transaction found' });
        return res.status(200).json({ success: true, data: transaction });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, error: 'No transaction found' });
    await transaction.deleteOne();
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};