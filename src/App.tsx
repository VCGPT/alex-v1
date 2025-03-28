import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import LoginPage from './pages/LoginPage';
import AppsDashboard from './pages/AppsDashboard';
import FundManagerPage from './pages/fundManagers/FundManagerPage';
import './App.css';
import NewInvestment from './pages/fundManagers/NewInvestment';
import InvestmentView from './pages/fundManagers/InvestmentView';
import { Investment, InvestmentType, Document, Fund, LimitedPartner } from './types';
import FundManagerLayout from './components/FundManagerLayout';
import DocumentsListView from './pages/fundManagers/DocumentsListView';
import SettingsPage from './pages/SettingsPage';
import DashboardLayout from './components/DashboardLayout';
import FundsListView from './pages/fundManagers/FundsListView';
import AddFundView from './pages/fundManagers/AddFundView';
import IndividualFundView from './pages/fundManagers/IndividualFundView';
import AddLimitedPartnerView from './pages/fundManagers/AddLimitedPartnerView';
import IndividualLPView from './pages/fundManagers/IndividualLPView';
import InvestmentsListVew from './pages/fundManagers/InvestmentsListView';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// const clerkPubKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkPubKey = "pk_test_aW5ub2NlbnQtbW9sbHVzay0yLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

const AuthenticatedContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? <>{children}</> : null;
};

const UnauthenticatedContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  return !isSignedIn ? <>{children}</> : null;
};



export const MockDocuments: Document[] = [

];

export const userId = "67e5dc9160a736435288483e";


const AppContent: React.FC = () => {
  return (
    <div className="App">
      <AuthenticatedContent>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<AppsDashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/fundmanager-ai" element={<FundManagerLayout />}>
            <Route index element={<InvestmentsListVew showHeader={true} showFilters={true} showFundChip={true}/>} />
            <Route path=":investmentId" element={<InvestmentView />} />
            <Route path="new-investment" element={<NewInvestment />} />
            <Route path=":investmentId/edit" element={<NewInvestment />} />
            <Route path="documents" element={<DocumentsListView showFilters={true} showUploadNew={true} showHeader={true} />} />
            <Route path="limited-partners" element={<div>Limited Partners Page</div>} />
            <Route path="funds" element={<FundsListView showHeader={true} showFundChip={true}/>} />
            <Route path="new-fund" element={<AddFundView />} />
            <Route path="funds/:fundId" element={<IndividualFundView />}/>
            <Route path="funds/:fundId/edit" element={<AddFundView />}/>
            <Route path="funds/:fundId/add-LP" element={<AddLimitedPartnerView />} />
            <Route path="limited-partners/:limitedPartnerId" element={<IndividualLPView />} />
            <Route path="limited-partners/:limitedPartnerId/edit" element={<AddLimitedPartnerView />} />
          </Route>
        </Routes>
      </AuthenticatedContent>
      <UnauthenticatedContent>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </UnauthenticatedContent>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default App;
