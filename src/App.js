// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCardIcon from '@mui/icons-material/AddCard';
import BarChartIcon from '@mui/icons-material/BarChart';

import LoginPage from './components/LoginPage';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import FilterControls from './components/FilterControls';
import PaginationControls from './components/PaginationControls';
import Analytics from './components/Analytics';

const drawerWidth = 240;

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [filters, setFilters] = useState({ type: 'all', category: 'all' });
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const ITEMS_PER_PAGE = 5;

  const fetchTransactions = async (page = 1) => {
    setLoading(true);
    try {
      // This is now the ONLY data fetch, it's simple and paginated
      const params = new URLSearchParams({ ...filters, page, limit: ITEMS_PER_PAGE });
      const response = await axios.get(`/api/transactions?${params}`);
      setTransactions(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1);
  }, [filters]);

  const handleAddTransaction = async (data) => {
    await axios.post('/api/transactions', data);
    setFilters({ type: 'all', category: 'all' }); // Reset filters to force a full refresh
    navigate('/');
  };
  const handleDeleteTransaction = async (id) => {
    await axios.delete(`/api/transactions/${id}`);
    fetchTransactions(pagination.currentPage); // Refetch the current page
  };
  const handleUpdateTransaction = async (id, data) => {
    await axios.put(`/api/transactions/${id}`, data);
    navigate('/');
    // A small delay before refetching to allow DB to update
    setTimeout(() => setFilters(prev => ({...prev})), 100);
  };
  const handleEdit = (transaction) => { setCurrentTransaction(transaction); navigate('/add'); };
  const handleCancelEdit = () => { setCurrentTransaction(null); navigate('/'); };
  const handleFilterChange = (newFilters) => setFilters(prev => ({ ...prev, ...newFilters }));
  const handlePageChange = (newPage) => fetchTransactions(newPage);

  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/add': return currentTransaction ? 'Edit Transaction' : 'Add New Transaction';
      case '/analytics': return 'Financial Analytics';
      default: return 'BudgetBuddy';
    }
  };

  const drawer = (
    <div>
      <Toolbar><Typography variant="h6" noWrap component="div" fontWeight="bold">BudgetBuddy</Typography></Toolbar>
      <List>
        <ListItem disablePadding><ListItemButton component={RouterLink} to="/" selected={location.pathname === '/'}><ListItemIcon><DashboardIcon /></ListItemIcon><ListItemText primary="Dashboard" /></ListItemButton></ListItem>
        <ListItem disablePadding><ListItemButton component={RouterLink} to="/add" selected={location.pathname === '/add'}><ListItemIcon><AddCardIcon /></ListItemIcon><ListItemText primary="Add Transaction" /></ListItemButton></ListItem>
        <ListItem disablePadding><ListItemButton component={RouterLink} to="/analytics" selected={location.pathname === '/analytics'}><ListItemIcon><BarChartIcon /></ListItemIcon><ListItemText primary="Analytics" /></ListItemButton></ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar><Typography variant="h6" noWrap component="div">{getHeaderTitle()}</Typography></Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }} anchor="left">{drawer}</Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}>
        <Routes>
          <Route path="/" element={
            <Paper elevation={2} sx={{ borderRadius: 2 }}>
              <Box sx={{ p: 2 }}><Typography variant="h6" fontWeight="medium">Filter & Manage Transactions</Typography></Box>
              <Box sx={{ p: 2 }}><FilterControls onFilterChange={handleFilterChange} /></Box>
              <TransactionList {...{ transactions, onDeleteTransaction: handleDeleteTransaction, onEditTransaction: handleEdit, loading }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}><PaginationControls pagination={pagination} onPageChange={handlePageChange} /></Box>
            </Paper>
          }/>
          <Route path="/add" element={<Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}><TransactionForm {...{ onAddTransaction: handleAddTransaction, onUpdateTransaction: handleUpdateTransaction, onCancelEdit: handleCancelEdit, currentTransaction }} /></Paper>}/>
          <Route path="/analytics" element={<Analytics transactions={transactions} />} />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => { setIsLoggedIn(true); };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/*" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;