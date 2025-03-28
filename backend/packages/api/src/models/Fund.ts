import mongoose, { Document } from 'mongoose';

// Define the Fund interface
export interface IFund extends Document {
  name: string;
  websiteUrl: string;
  legalEntity: string;
  description: string;
  fundSize: string;
  estimatedValue: string;
  portfolio: mongoose.Types.ObjectId[];  // Array of investment IDs
  updates: mongoose.Types.ObjectId[];    // Array of update IDs
  limitedPartners: mongoose.Types.ObjectId[];  // Array of limited partner IDs
  documents: mongoose.Types.ObjectId[];  // Array of document IDs
  createdAt: Date;
  updatedAt: Date;
}

// Create the Fund schema
const FundSchema = new mongoose.Schema<IFund>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      required: true,
      trim: true,
    },
    legalEntity: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    fundSize: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedValue: {
      type: String,
      required: true,
      trim: true,
    },
    portfolio: [{
      type: String,
      ref: 'Investment',
    }],
    updates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FundUpdate',
    }],
    limitedPartners: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LimitedPartner',
    }],
    documents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the Fund model
export const Fund = mongoose.model<IFund>('Fund', FundSchema);
