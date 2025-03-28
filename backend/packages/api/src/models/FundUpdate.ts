import mongoose, { Document } from 'mongoose';

// Define the FundUpdate interface
export interface IFundUpdate extends Document {
  description: string;
  datePosted: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Create the FundUpdate schema
const FundUpdateSchema = new mongoose.Schema<IFundUpdate>(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    datePosted: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the FundUpdate model
export const FundUpdate = mongoose.model<IFundUpdate>('FundUpdate', FundUpdateSchema); 