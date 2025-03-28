import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { createUser, getCurrentUser, getUserById, getUserFunds, getUserInvestments, getUsers } from './controllers/userController';
import { createInvestment, getInvestmentById, getInvestments, updateInvestment } from './controllers/investmentController';
import { createFund, getFundById, getFundFundUpdates, getFundLimitedPartners, updateFund } from './controllers/fundController';
import { getFunds } from './controllers/fundController';
import { createLimitedPartner, getLimitedPartnerById, getLimitedPartners, updateLimitedPartner } from './controllers/limitedPartnerController';
import { createFundUpdate } from './controllers/fundUpdateController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Basic route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to Predictive Internal API' });
});

// User routes
app.post('/users', createUser);
app.get('/users', getUsers);
app.get('/users/me', getCurrentUser);
app.get('/users/:userId/investments', getUserInvestments);
app.get('/users/:userId/funds', getUserFunds);
app.get('/users/:id', getUserById);
// app.post('/users/login', loginUser);
// app.put('/users/:id', updateUser);
// app.delete('/users/:id', deleteUser);

// Investment routes
app.post('/investments', createInvestment);
app.get('/investments', getInvestments);
app.get('/investments/:id', getInvestmentById);
app.put('/investments/:id', updateInvestment);

// Funds routes
app.get('/funds', getFunds);
app.post('/funds', createFund);
app.get('/funds/:id', getFundById);
app.get('/funds/:id/limited-partners', getFundLimitedPartners);
app.get('/funds/:id/fund-updates',  getFundFundUpdates);
app.put('/funds/:id', updateFund);

// Limited Partners routes
app.get('/limited-partners', getLimitedPartners);
app.post('/limited-partners', createLimitedPartner);
app.get('/limited-partners/:id', getLimitedPartnerById);
app.put('/limited-partners/:id', updateLimitedPartner);

//  Fund Update Routes
app.post('/fund-updates', createFundUpdate);


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };  // Export for testing 