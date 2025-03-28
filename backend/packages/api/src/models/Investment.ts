import mongoose, { Document, Schema } from 'mongoose';

export type InvestmentType = 'Fund' | 'Angel';

// Define the Investment interface
export interface IInvestment extends Document {
  companyName: string;
  websiteUrl: string;
  founderEmail: string;
  description: string;
  amount: string;
  estimatedValue: string;
  investmentDate: Date;
  postMoneyValuation: string;
  fundInvested: string;
  status: string;
  documents: mongoose.Types.ObjectId[];  // Array of document IDs
  createdAt: Date;
  updatedAt: Date;
  type: InvestmentType;
}

// Create the Investment schema
const InvestmentSchema = new Schema<IInvestment>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      required: true,
      trim: true,
    },
    founderEmail: {
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
    amount: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedValue: {
      type: String,
      required: true,
      trim: true,
    },
    investmentDate: {
      type: Date,
      required: true,
    },
    postMoneyValuation: {
      type: String,
      required: true,
      trim: true,
    },
    fundInvested: {
      type: String,
      required: true,
      trim: true,
      ref: 'Fund',
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    documents: [{
      type: String,
      ref: 'Document',
    }],
    type: {
      type: String,
      enum: ['Fund', 'Angel'],
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the Investment model
export const Investment = mongoose.model<IInvestment>('Investment', InvestmentSchema); 