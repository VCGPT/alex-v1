import { Request, Response } from 'express';
import { LimitedPartner } from '../models/LimitedPartner';
import { Fund } from '../models/Fund';
import { Types } from 'mongoose';
// Get all limited partners
export const getLimitedPartners = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const limitedPartners = await LimitedPartner.find();
    return res.status(200).json(limitedPartners);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching limited partners', error });
  }
};

// Get a single limited partner by ID
export const getLimitedPartnerById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const limitedPartner = await LimitedPartner.findById(req.params.id);
    if (!limitedPartner) {
      return res.status(404).json({ message: 'Limited partner not found' });
    }
    return res.status(200).json(limitedPartner);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching limited partner', error });
  }
};

// Create a new limited partner
export const createLimitedPartner = async (req: Request, res: Response) => {
  try {

    const {fundId, ...limitedPartnerData} = req.body;
    
    if(!fundId) {
      return res.status(400).json({ message: 'fundId is required' });
    }

    const limitedPartner = new LimitedPartner(limitedPartnerData);
    const savedLimitedPartner = await limitedPartner.save();

    const fund = await Fund.findById(fundId);
    if(!fund) {
      await LimitedPartner.findByIdAndDelete(savedLimitedPartner._id);
      return res.status(404).json({ message: 'Fund not found' });
    }

    fund.limitedPartners.push(savedLimitedPartner._id as Types.ObjectId);
    await fund.save();
    
    return res.status(201).json(savedLimitedPartner);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating limited partner', error });
  }
};

// Update a limited partner
export const updateLimitedPartner = async (req: Request, res: Response): Promise<Response> => {
  try {
    const limitedPartner = await LimitedPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!limitedPartner) {
      return res.status(404).json({ message: 'Limited partner not found' });
    }
    return res.status(200).json(limitedPartner);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating limited partner', error });
  }
};

// Delete a limited partner
export const deleteLimitedPartner = async (req: Request, res: Response): Promise<Response> => {
  try {
    const limitedPartner = await LimitedPartner.findByIdAndDelete(req.params.id);
    if (!limitedPartner) {
      return res.status(404).json({ message: 'Limited partner not found' });
    }
    return res.status(200).json({ message: 'Limited partner deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting limited partner', error });
  }
}; 