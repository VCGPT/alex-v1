import React, { useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Typography,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppCard from '../components/AppCard';

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'For Investors', value: 'investors' },
  { label: 'For Founders', value: 'founders' },
  { label: 'For Limited Partners', value: 'limited-partners' },
];

// Temporary mock data for cards
const mockCards = [
  {
    title: 'Fundmanager.ai',
    description: 'AI-powered fund admin for nimble funds & super angels',
    imageUrl: '/assets/appImage1.svg',
    category: 'For Investors',
    path: '/fundmanager-ai',
  },
  {
    title: 'Limitedpartner.ai',
    description: 'AI-powered control panel for high-performing limited partners ',
    imageUrl: '/assets/appImage2.svg',
    category: 'For Limited Partners',
    path: '/pitch-deck-analyzer',
  },
  {
    title: 'Findintros.ai',
    description: 'Harness your investor ecosystem to pinpoint customers & request intros',
    imageUrl: '/assets/appImage3.svg',
    category: 'For Founders',
    path: '/lp-portfolio-insights',
  },
  {
    title: 'Companytracker.ai',
    description: 'Input investment prospects and track all relevant updates, in real-time',
    imageUrl: '/assets/appImage4.svg',
    category: 'For Investors',
    path: '/lp-portfolio-insights',
  },
  {
    title: 'VCassociate.ai',
    description: 'Enter characteristics and comb target websites for relevant prospects',
    imageUrl: '/assets/appImage5.svg',
    category: 'For Investors',
    path: '/lp-portfolio-insights',
  },
  {
    title: 'Memogenerator.ai',
    description: 'AI-powered investment memo generation',
    imageUrl: '/assets/appImage6.svg',
    category: 'For Investors',
    path: '/lp-portfolio-insights',
  },
];

const AppsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState('marketplace');
  const [selectedTab, setSelectedTab] = useState('all');

  const handleButtonClick = (value: string) => {
    if (value === 'settings') {
      navigate('/settings');
      return;
    }
    if (value === 'logout') {
      // Handle logout logic here
      return;
    }
    setSelectedButton(value);
  };

  const handleAddApp = (appTitle: string) => {
    console.log(`Adding app: ${appTitle}`);
  };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        {/* Header */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, textAlign: 'left'}}>
          Cutting-Edge Applications for Startup Investing
        </Typography>

        {/* Search and Tabs Container */}
        
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search applications..."
            variant="outlined"
            sx={{
              mb: 2,
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.10)",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "28px",
                height: "36px",
              },
            }}
          />

          {/* Filter Tabs */}
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons={false}
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              mb: 1,
              minHeight: '36px',
              '& .MuiTabs-flexContainer': {
                gap: 1,
              },
              '& .MuiTab-root': {
                minHeight: '32px',
                padding: '6px 16px',
                borderRadius: '16px',
                fontSize: '0.875rem',
                textTransform: 'none',
                border: '1px solid transparent',
                '&.Mui-selected': {
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                  backgroundColor: 'transparent',
                  color: 'black',
                },
              },
            }}
          >
            {filterTabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                disableRipple
              />
            ))}
          </Tabs>
      
        {/* Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '600px' }}>
          {selectedTab === 'all' && mockCards.map((card, index) => (
            <AppCard
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              category={card.category}
              path={card.path}
              onAdd={() => handleAddApp(card.title)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AppsDashboard; 