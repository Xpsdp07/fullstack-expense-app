import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ExpenseList({ expenses, onDelete }) {
  // Get last 3 (newest first)
  const recentExpenses = expenses.slice(-3).reverse();

  if (recentExpenses.length === 0) {
    return (
      <Box sx={{ m: 2, textAlign: 'center', opacity: 0.6 }}>
        No expenses yet.
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="medium" aria-label="recent expenses table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Note</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentExpenses.map(exp => (
            <TableRow key={exp.id}>
              <TableCell>{exp.date}</TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell>{exp.amount}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.note && exp.note.trim() !== '' ? exp.note : 'none'}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => onDelete(exp.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseList;
