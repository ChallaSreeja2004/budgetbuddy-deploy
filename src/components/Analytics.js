// src/components/Analytics.js
import React, { useMemo } from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = ({ transactions }) => {
  // useMemo will cache these calculations and only re-run them if `transactions` changes.
  // This is a performance optimization.
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    transactions.forEach(t => {
      if (t.type === 'Income') {
        income += t.amount;
      } else {
        // Ensure we are adding the absolute value for expense calculation
        expenses += Math.abs(t.amount); 
      }
    });
    return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
  }, [transactions]);

  const expenseChartData = useMemo(() => {
    const expenseByCategory = transactions
      .filter(t => t.type === 'Expense')
      .reduce((acc, transaction) => {
        const category = transaction.category;
        const amount = Math.abs(transaction.amount);
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});

    const labels = Object.keys(expenseByCategory);
    const data = Object.values(expenseByCategory);

    return {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data,
          backgroundColor: [
            '#FF6384', // Vivid Red
            '#36A2EB', // Bright Blue
            '#FFCE56', // Warm Yellow
            '#4BC0C0', // Teal
            '#9966FF', // Purple
            '#FF9F40', // Orange
          ],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    };
  }, [transactions]);

  // A more professional Summary Card component
  const SummaryCard = ({ title, value, color, description }) => (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" fontWeight="medium" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h3" fontWeight="bold" sx={{ color }}>
        ${value.toFixed(2)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {description}
      </Typography>
    </Paper>
  );

  return (
    <Box>
        {/* 1. PROFESSIONAL WELCOME HEADER */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: '#e3f2fd', borderLeft: '5px solid', borderColor: 'primary.main', borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Your Financial Snapshot
            </Typography>
            <Typography color="text.secondary">
                Here’s a high-level overview of your finances based on the current filters. Use these insights to understand your cash flow and see where your money is going at a glance.
            </Typography>
        </Paper>

        <Grid container spacing={3}>
            {/* 2. BOLDER SUMMARY CARDS */}
            <Grid item xs={12} sm={4}>
                <SummaryCard title="Total Income" value={totalIncome} color="#2e7d32" description="All earnings received." />
            </Grid>
            <Grid item xs={12} sm={4}>
                <SummaryCard title="Total Expenses" value={totalExpenses} color="#d32f2f" description="All money spent." />
            </Grid>
            <Grid item xs={12} sm={4}>
                <SummaryCard title="Net Balance" value={balance} color={balance >= 0 ? '#1976d2' : '#d32f2f'} description="Income minus expenses." />
            </Grid>
            
            {/* 3. ENHANCED PIE CHART CARD */}
            <Grid item xs={12}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" fontWeight="medium" gutterBottom>
                        Expense Breakdown by Category
                    </Typography>
                    <Box sx={{ height: { xs: 300, md: 400 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {expenseChartData.labels.length > 0 ? (
                            <Pie 
                                data={expenseChartData} 
                                options={{ 
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: false, // We have our own title above
                                        }
                                    }
                                }} 
                            />
                        ) : (
                            <Typography color="text.secondary">
                                No expense data is available for the selected period. Add some expenses to see your breakdown.
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </Box>
  );
};

export default Analytics;