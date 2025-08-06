// src/components/TransactionForm.js

// 1. Import useEffect
import React, { useState, useEffect } from 'react'; 
// 1. Import Date Picker and its provider
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';

import './TransactionForm.css';
import { de } from 'date-fns/locale';

// 2. Destructure all the new props
const TransactionForm = ({ onAddTransaction, onUpdateTransaction, onCancelEdit, currentTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('Food');
  const [isCleared, setIsCleared] = useState(false);
 const [date, setDate] = useState(new Date());
  // 3. This `useEffect` hook watches for changes to `currentTransaction`.
  //    If it changes (i.e., we clicked an "Edit" button), it populates the form.
  useEffect(() => {
    if (currentTransaction) {
      setDescription(currentTransaction.description);
      setAmount(String(currentTransaction.amount)); // Convert amount to string for the input field
      setType(currentTransaction.type);
      setCategory(currentTransaction.category);
      setDate(new Date(currentTransaction.date)); 
    } else {
      // If we are not editing, clear the form (e.g., after an update or cancellation)
      setDescription('');
      setAmount('');
      setType('Expense');
      setCategory('Food');
      setDate(new Date()); 
    }
  }, [currentTransaction]); // The hook re-runs whenever `currentTransaction` changes

  const handleSubmit = (e) => {
    e.preventDefault();
 const transactionData = { description, amount: Number(amount), type, category, isCleared, date };
    // 4. If we are in edit mode, call the update function. Otherwise, call the add function.
    if (currentTransaction) {
      onUpdateTransaction(currentTransaction._id, transactionData);
    } else {
      onAddTransaction(transactionData);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          mb: 4, 
          p: 3, 
          border: '1px solid #e0e0e0', 
          borderRadius: 2, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
        }}
      >
        <Typography variant="h6" gutterBottom>
          {currentTransaction ? 'Edit Transaction' : 'Add New Transaction'}
        </Typography>

        {/* Description Field */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Amount Field */}
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          fullWidth
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Type and Category Selects in a row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
              <MenuItem value="Expense">Expense</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Date Picker */}
        <DatePicker
            label="Transaction Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => <TextField {...params} fullWidth required sx={{ mb: 2 }} />}
        />
        
        {/* Cleared Checkbox */}
        <FormControlLabel
          control={<Checkbox checked={isCleared} onChange={(e) => setIsCleared(e.target.checked)} />}
          label="Mark as Cleared"
          sx={{ mb: 2, display: 'block' }} // Ensure it takes full width and has margin
        />
        
        {/* Buttons in a row */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button type="submit" variant="contained" color="primary" size="large">
            {currentTransaction ? 'Update' : 'Add'}
          </Button>
          {currentTransaction && (
            <Button variant="outlined" color="secondary" onClick={onCancelEdit} size="large">
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
export default TransactionForm;