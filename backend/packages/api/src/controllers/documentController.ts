import { Request, Response } from 'express';
import { DocumentModel, IDocument } from '../models/Document';

// Get all documents
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await DocumentModel.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error });
  }
};

// Get a single document by ID
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const document = await DocumentModel.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching document', error });
  }
};

// Create document
export const createDocument = async (req: Request, res: Response): Promise<Response> => {
  try {
    const documentData: IDocument = req.body;
    const document = new DocumentModel(documentData);
    const savedDocument = await document.save();
    return res.status(201).json(savedDocument);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating document', error });
  }
};

// Update a document
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const document = await DocumentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document', error });
  }
};

// Delete a document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const document = await DocumentModel.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error });
  }
}; 