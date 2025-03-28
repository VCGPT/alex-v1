import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Investment } from '../../types';
import InvestmentsListVew from './InvestmentsListView';

interface FundManagerPageProps {
  investments: Investment[];
}

const FundManagerPage: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);

  React.useEffect(() => {
    const fetchInvestments = async () => {
      const response = await fetch('/api/investments');
      const data = await response.json();
      setInvestments(data);
    };
  }, []);

  return (
    <Box >
      <InvestmentsListVew showHeader={true} showFilters={true} showFundChip={true}/>
    </Box>
  );
};

export default FundManagerPage; 