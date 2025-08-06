// src/components/TransactionList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box , CircularProgress} from '@mui/material';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TransactionList = ({ transactions, onDeleteTransaction, onEditTransaction, loading  }) => {
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    }
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Transactions</Typography>
      {transactions.length === 0 ? (
        <Typography>No transactions yet.</Typography>
      ) : (
        <List>
          {transactions.map(transaction => (
            <ListItem
              key={transaction._id}
              sx={{ borderLeft: `5px solid ${transaction.type === 'Income' ? 'green' : 'red'}`, mb: 1, bgcolor: '#f9f9f9', borderRadius: '4px' }}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => onEditTransaction(transaction)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTransaction(transaction._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${transaction.description} ${transaction.isCleared ? '✅' : ''}`}
                secondary={
                  // Format the date string from the DB into a readable format
                  `${format(new Date(transaction.date), 'MM/dd/yyyy')} | $${Number(transaction.amount).toFixed(2)} - ${transaction.category}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TransactionList;