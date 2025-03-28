import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import FundManagerNavigation from './FundManagerNavigation';

const FundManagerLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <FundManagerNavigation />
      <Box sx={{ flex: 1, px: "130px", pt:"100px"}}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default FundManagerLayout; 