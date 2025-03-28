"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvestment = exports.updateInvestment = exports.createInvestment = exports.getInvestmentById = exports.getInvestments = void 0;
const Investment_1 = require("../models/Investment");
const getInvestments = async (_req, res) => {
    try {
        const investments = await Investment_1.Investment.find();
        return res.status(200).json(investments);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching investments', error });
    }
};
exports.getInvestments = getInvestments;
const getInvestmentById = async (req, res) => {
    try {
        const investment = await Investment_1.Investment.findById(req.params.id);
        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }
        return res.status(200).json(investment);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching investment', error });
    }
};
exports.getInvestmentById = getInvestmentById;
const createInvestment = async (req, res) => {
    try {
        const investmentData = req.body;
        const investment = new Investment_1.Investment(investmentData);
        const savedInvestment = await investment.save();
        res.status(201).json(savedInvestment);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating investment', error });
    }
};
exports.createInvestment = createInvestment;

const updateInvestment = async (req, res) => {
    try {
        const investment = await Investment_1.Investment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }
        return res.status(200).json(investment);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating investment', error });
    }
};
exports.updateInvestment = updateInvestment;

const deleteInvestment = async (req, res) => {
    try {
        const investment = await Investment_1.Investment.findByIdAndDelete(req.params.id);
        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }
        return res.status(200).json({ message: 'Investment deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting investment', error });
    }
};
exports.deleteInvestment = deleteInvestment;
//# sourceMappingURL=investmentController.js.map