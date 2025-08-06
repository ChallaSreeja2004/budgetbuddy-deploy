// api/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // In a serverless environment, we might not want to exit the process
    // but the log is crucial.
  }
};

module.exports = connectDB;