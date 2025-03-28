import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardNavigation from './DashboardNavigation';

const DashboardLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardNavigation />
      <Box sx={{ flex: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout; 