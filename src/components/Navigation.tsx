import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { UserButton } from '@clerk/clerk-react';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/about"
              color="inherit"
            >
              About
            </Button>
          </Box>
          <UserButton afterSignOutUrl="/"/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation; 