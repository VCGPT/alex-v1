import mongoose, { Document } from 'mongoose';

// Define the LimitedPartner interface
export interface ILimitedPartner extends Document {
  name: string;
  websiteUrl: string;
  email: string;
  description: string;
  legalEntity: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the LimitedPartner schema
const LimitedPartnerSchema = new mongoose.Schema<ILimitedPartner>(
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
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    legalEntity: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the LimitedPartner model
export const LimitedPartner = mongoose.model<ILimitedPartner>('LimitedPartner', LimitedPartnerSchema); 