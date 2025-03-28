import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to the Home Page
          </Typography>
          <Typography variant="body1">
            This is your starting point. Built with React, TypeScript, and Material UI.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 