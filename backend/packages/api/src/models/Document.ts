import mongoose, { Document } from 'mongoose';

// Define the Document interface
export interface IDocument extends Document {
  file: string;  // URL or path to the stored file
  companyName: string;
  description: string;
  uploadDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Document schema
const DocumentSchema = new mongoose.Schema<IDocument>(
  {
    file: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    uploadDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the Document model
export const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema); 