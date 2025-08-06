// src/components/LoginPage.js
import React, { useState } from 'react';

// Import the necessary MUI components and Icons
import { Button, TextField, Box, Typography, Container, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PieChartIcon from '@mui/icons-material/PieChart';
import FlagIcon from '@mui/icons-material/Flag';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    // Use a Grid container to create the two-column layout
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left "Information" Column */}
      <Grid
        item
        xs={12} // On extra-small screens, this column takes up the full width
        sm={6}  // On small screens and up, it takes up half the width
        md={7}  // On medium screens and up, it takes up a bit more width
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 2, sm: 4, md: 8 }, // Responsive padding
          backgroundColor: '#f0f2f5', // A light background color for contrast
        }}
      >
        <Box>
          <Typography component="h1" variant="h3" color="primary" fontWeight="700">
            BudgetBuddy
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
            Take control of your finances. Smart budgeting, simplified for you.
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <TrackChangesIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Track Every Transaction"
                secondary="Easily add income and expenses to see where your money goes."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PieChartIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Visualize Your Spending"
                secondary="Filter and view your financial habits with clear, simple lists."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FlagIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Achieve Your Goals"
                secondary="By understanding your budget, you can save for what matters most."
              />
            </ListItem>
          </List>
        </Box>
      </Grid>

      {/* Right "Login Form" Column */}
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={5} 
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username or Email"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }} // Make button a bit taller
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;