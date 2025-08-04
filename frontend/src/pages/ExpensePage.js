import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import StickyNavbar from '../components/StickyNavbar';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const menuItems = [
  { label: 'Expenses', path: '/expense', key: 'expense' },
  { label: 'History', path: '/history', key: 'history' },
  { label: 'Dashboard', path: '/dashboard', key: 'dashboard' },
];

function Expenses() {
  const [currentPage, setCurrentPage] = useState('expense');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (currentPage === 'expense') {
      const fetchExpenses = async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await axios.get(API_URL);
          setExpenses(res.data);
        } catch (err) {
          setError('Failed to load expenses.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchExpenses();
    }
  }, [currentPage]);

  const addExpense = useCallback(async (expense) => {
    try {
      const res = await axios.post(API_URL, expense);
      setExpenses((prev) => [res.data, ...prev]);
    } catch {
      alert('Error adding expense');
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert('Error deleting expense');
    }
  }, []);

  const renderContent = () => {
    // Only render the expense page content
    if (currentPage === 'expense') {
      return (
        <>
          <Paper
            elevation={6}
            sx={{
              mb: 5,
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              bgcolor: '#ffffffcc',
              boxShadow:
                '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Typography
              variant={isMobile ? 'h6' : 'h4'}
              color="primary"
              sx={{ fontWeight: 700, letterSpacing: '0.05em' }}
              gutterBottom
              align="center"
            >
              Add New Expense
            </Typography>
            <ExpenseForm onAdd={addExpense} />
          </Paper>

          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              bgcolor: '#ffffffcc',
              boxShadow:
                '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                px: 1,
              }}
            >
              <Typography
                variant={isMobile ? 'h6' : 'h4'}
                color="primary"
                sx={{ fontWeight: 700, letterSpacing: '0.05em' }}
              >
                My Expenses
              </Typography>
              <Tooltip title={visible ? 'Hide Last 3 Expenses' : 'View Last 3 Expenses'}>
                <IconButton
                  color="primary"
                  aria-label={visible ? 'Hide expenses' : 'Show expenses'}
                  onClick={() => setVisible(!visible)}
                  size="large"
                >
                  {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Tooltip>
            </Box>

            {visible && (
              <>
                {loading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
                    <CircularProgress color="primary" size={36} />
                  </Box>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                {!loading && expenses.length === 0 && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 4, fontStyle: 'italic' }}
                  >
                    No expenses found. Add some expenses to get started.
                  </Typography>
                )}

                {!loading && expenses.length > 0 && (
                  <ExpenseList expenses={expenses} onDelete={deleteExpense} sx={{ mt: 2 }} />
                )}
              </>
            )}
          </Paper>
        </>
      );
    }

    // Render fallback 404-like for anything else:
    return (
      <Box sx={{ p: 3, textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">
          404 - Page Not Found
        </Typography>
      </Box>
    );
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d7eaff 10%, #f0f4ff 90%)',
        px: 2,
        py: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <StickyNavbar
        menuItems={menuItems}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        useRouterLinks={false} // Change to true if using react-router-dom Links elsewhere
      />

      <Box sx={{ pt: '64px', width: '100%' }}>
        <Container maxWidth="md" sx={{ mb: 6 }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
}

export default Expenses;
