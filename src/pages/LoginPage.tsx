import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { SignIn } from '@clerk/clerk-react';

const LoginPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        sx={{
          width: '25%',
          bgcolor: 'black',
          display: { xs: 'none', md: 'flex' }, // Hide on mobile, flex on desktop
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 3,
        }}
      >
        <Box
          component="img"
          src="/assets/predictiveLogo.svg"
          alt="Predictive Logo"
          sx={{
            maxWidth: '80%',
            height: 'auto',
            marginBottom: 4,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'light',
            lineHeight: 1.4,
            marginBottom: 4,
          }}
        >
          Cutting-Edge AI Agents
          <br />
          for Startup Investing
        </Typography>
        
        {/* Icons stacked vertically */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            component="img"
            src="/assets/loginGraphic.png"
            alt="Fund Intros"
            sx={{
              width: '80%',
              height: 'auto',
            //   filter: 'brightness(0) invert(1)', // Make the icon white
            }}
          />

        </Box>
      </Box>
      
      {/* Right three quarters - White background with sign-in */}
      <Box
        sx={{
          width: { xs: '100%', md: '75%' },
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <SignIn
            appearance={{
              elements: {
                rootBox: {
                  margin: '0 auto',
                },
                card: {
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
              },
            }}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage; 