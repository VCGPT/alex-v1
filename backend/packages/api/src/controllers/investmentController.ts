import { Request, Response } from 'express';
import { Investment } from '../models/Investment';
import { User } from '../models/User';
import { Types } from 'mongoose';

// Get all investments
export const getInvestments = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const investments = await Investment.find();
    return res.status(200).json(investments);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching investments', error });
  }
};

// Get a single investment by ID
export const getInvestmentById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    return res.status(200).json(investment);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching investment', error });
  }
};

// Create a new investment
export const createInvestment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, type, ...investmentData } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    if (!type || !['Fund', 'Angel'].includes(type)) {
      return res.status(400).json({ 
        message: 'Investment type is required and must be either "Fund" or "Angel"' 
      });
    }

    // Create new investment with type
    const investment = new Investment({ ...investmentData, type });
    const savedInvestment = await investment.save();

    // Add investment to user's investments array
    const user = await User.findById(userId);
    if (!user) {
      // If user not found, delete the created investment and return error
      await Investment.findByIdAndDelete(savedInvestment._id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Add investment ID to user's investments array
    user.investments.push(savedInvestment._id as Types.ObjectId);
    await user.save();

    return res.status(201).json(savedInvestment);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating investment', error });
  }
};

// Update an investment
export const updateInvestment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate type if it's being updated
    if (updateData.type && !['Fund', 'Angel'].includes(updateData.type)) {
      return res.status(400).json({ 
        message: 'Investment type must be either "Fund" or "Angel"' 
      });
    }

    const investment = await Investment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    return res.json(investment);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating investment', error });
  }
};

// Delete an investment
export const deleteInvestment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const investment = await Investment.findByIdAndDelete(req.params.id);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    return res.status(200).json({ message: 'Investment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting investment', error });
  }
}; 