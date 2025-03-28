import { Request, Response } from 'express';
import { FundUpdate } from '../models/FundUpdate';
import { Fund } from '../models/Fund';
import { Types } from 'mongoose';
// Get all fund updates
export const getFundUpdates = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const fundUpdates = await FundUpdate.find();
    return res.status(200).json(fundUpdates);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching fund updates', error });
  }
};

// Get a single fund update by ID
export const getFundUpdateById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fundUpdate = await FundUpdate.findById(req.params.id);
    if (!fundUpdate) {
      return res.status(404).json({ message: 'Fund update not found' });
    }
    return res.status(200).json(fundUpdate);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching fund update', error });
  }
};

// Create a new fund update
export const createFundUpdate = async (req: Request, res: Response) => {
  try {


    const {fundId, ...updateData} = req.body;
    if(!fundId) {
      return res.status(400).json({ message: 'fundId is required' });
    }

    const update = new FundUpdate(updateData);
    const savedUpdate = await update.save();

    const fund = await Fund.findById(fundId);
    if(!fund) {
      await FundUpdate.findByIdAndDelete(savedUpdate._id);
      return res.status(404).json({ message: 'Fund not found' });
    }

    fund.updates.push(savedUpdate._id as Types.ObjectId);
    await fund.save();

    return res.status(201).json(savedUpdate);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating fund update', error });
  }
};

// Update a fund update
export const updateFundUpdate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fundUpdate = await FundUpdate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!fundUpdate) {
      return res.status(404).json({ message: 'Fund update not found' });
    }
    return res.status(200).json(fundUpdate);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating fund update', error });
  }
};

// Delete a fund update
export const deleteFundUpdate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fundUpdate = await FundUpdate.findByIdAndDelete(req.params.id);
    if (!fundUpdate) {
      return res.status(404).json({ message: 'Fund update not found' });
    }
    return res.status(200).json({ message: 'Fund update deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting fund update', error });
  }
}; 