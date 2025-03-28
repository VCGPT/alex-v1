"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.createDocument = exports.getDocumentById = exports.getDocuments = void 0;
const Document_1 = require("../models/Document");
const getDocuments = async (_req, res) => {
    try {
        const documents = await Document_1.DocumentModel.find();
        return res.status(200).json(documents);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching documents', error });
    }
};
exports.getDocuments = getDocuments;
const getDocumentById = async (req, res) => {
    try {
        const document = await Document_1.DocumentModel.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        return res.status(200).json(document);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching document', error });
    }
};
exports.getDocumentById = getDocumentById;
const createDocument = async (req, res) => {
    try {
        const documentData = req.body;
        const document = new Document_1.DocumentModel(documentData);
        const savedDocument = await document.save();
        return res.status(201).json(savedDocument);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating document', error });
    }
};
exports.createDocument = createDocument;
const updateDocument = async (req, res) => {
    try {
        const document = await Document_1.DocumentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        return res.status(200).json(document);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating document', error });
    }
};
exports.updateDocument = updateDocument;
const deleteDocument = async (req, res) => {
    try {
        const document = await Document_1.DocumentModel.findByIdAndDelete(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        return res.status(200).json({ message: 'Document deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting document', error });
    }
};
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=documentController.js.map