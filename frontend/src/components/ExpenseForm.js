import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Stack, Chip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const getToday = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

const initialForm = {
  date: getToday(),
  description: '',
  amount: '',
  category: 'Food',
  note: ''
};

const categories = ['Food', 'Travel', 'Shopping', 'Utilities', 'Other'];
const amountSuggestions = [100, 500, 1000];

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAmountSuggestion = val => {
    setForm(f => ({
      ...f,
      amount: val
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.date || !form.description || !form.amount) {
      alert('Please fill all required fields');
      return;
    }
    onAdd(form);
    setForm({ ...initialForm, date: getToday() });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{ min: "0", step: "0.01" }}
          />
          <Stack direction="row" spacing={1} mt={1}>
            {amountSuggestions.map(val => (
              <Chip
                key={val}
                label={val}
                clickable
                onClick={() => handleAmountSuggestion(val)}
                variant="outlined"
                color="primary"
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Note (optional)"
            name="note"
            value={form.note}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            fullWidth
            sx={{ height: "56px", mt: { xs: 2, sm: 0 } }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExpenseForm;
