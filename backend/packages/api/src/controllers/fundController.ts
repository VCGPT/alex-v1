import { Request, Response } from 'express';
import { Fund } from '../models/Fund';
import { User } from '../models/User';
import { Types } from 'mongoose';
import { LimitedPartner } from '../models/LimitedPartner';
import { FundUpdate } from '../models/FundUpdate';

// Get all funds
export const getFunds = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const funds = await Fund.find();
    return res.status(200).json(funds);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching funds', error });
  }
};

// Get a single fund by ID
export const getFundById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fund = await Fund.findById(req.params.id);
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    return res.status(200).json(fund);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching fund', error });
  }
};

export const getFundLimitedPartners = async (req: Request, res: Response): Promise<Response> => {
  try {
      const fundId = req.params.id;
      const fund = await Fund.findById(fundId).select('limitedPartners');
      if (!fund) {
        return res.status(404).json({ message: 'Fund not found' });
      }
      
      const limitedPartners = await Promise.all(
        fund.limitedPartners.map(async (limitedPartnerId) => {
          try{
            const limitedPartner = await LimitedPartner.findById(limitedPartnerId);
            return limitedPartner;
          } catch (err) {
            console.error('Error fetching limited partner:', limitedPartnerId, err);
            return null;
          }
        })
      );
      
      const validLimitedPartners = limitedPartners.filter(limitedPartner => limitedPartner !== null);
      return res.status(200).json(validLimitedPartners);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching fund limited partners', error });
  }
}

// Get fund updates by fund id
export const getFundFundUpdates = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fundId = req.params.id;
    console.log(fundId);
    const fund = await Fund.findById(fundId).select('updates');
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    console.log(fund);
    const fundUpdates = await Promise.all(
      fund.updates.map(async (fundUpdateId) => {
        try{
          const fundUpdate = await FundUpdate.findById(fundUpdateId);
          console.log(fundUpdate);
          return fundUpdate;
        } catch (err) {
          console.error('Error fetching fund update:', fundUpdateId, err);
          return null;
        }
      })
    );
    
    const validFundUpdates = fundUpdates.filter(fundUpdate => fundUpdate !== null);
    return res.status(200).json(validFundUpdates);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching fund updates', error });
  }
}


// Create a new fund
export const createFund = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, ...fundData } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Create new fund
    const fund = new Fund(fundData);
    const savedFund = await fund.save();

    // Add fund to user's funds array
    const user = await User.findById(userId);
    if (!user) {
      // If user not found, delete the created fund and return error
      await Fund.findByIdAndDelete(savedFund._id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Add fund ID to user's funds array
    user.funds.push(savedFund._id as Types.ObjectId);
    await user.save();

    return res.status(201).json(savedFund);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating fund', error });
  }
};

// Update a fund
export const updateFund = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fund = await Fund.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    return res.status(200).json(fund);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating fund', error });
  }
};

// Delete a fund
export const deleteFund = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fund = await Fund.findByIdAndDelete(req.params.id);
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    return res.status(200).json({ message: 'Fund deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting fund', error });
  }
}; 