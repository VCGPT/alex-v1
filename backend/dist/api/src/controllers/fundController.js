"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFund = exports.updateFund = exports.createFund = exports.getFundById = exports.getFunds = void 0;
const Fund_1 = require("../models/Fund");
const getFunds = async (_req, res) => {
    try {
        const funds = await Fund_1.Fund.find();
        return res.status(200).json(funds);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching funds', error });
    }
};
exports.getFunds = getFunds;
const getFundById = async (req, res) => {
    try {
        const fund = await Fund_1.Fund.findById(req.params.id);
        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }
        return res.status(200).json(fund);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching fund', error });
    }
};
exports.getFundById = getFundById;
const createFund = async (req, res) => {
    try {
        const fundData = req.body;
        const fund = new Fund_1.Fund(fundData);
        const savedFund = await fund.save();
        res.status(201).json(savedFund);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating fund', error });
    }
};
exports.createFund = createFund;
const updateFund = async (req, res) => {
    try {
        const fund = await Fund_1.Fund.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }
        return res.status(200).json(fund);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating fund', error });
    }
};
exports.updateFund = updateFund;
const deleteFund = async (req, res) => {
    try {
        const fund = await Fund_1.Fund.findByIdAndDelete(req.params.id);
        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }
        return res.status(200).json({ message: 'Fund deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting fund', error });
    }
};
exports.deleteFund = deleteFund;
//# sourceMappingURL=fundController.js.map