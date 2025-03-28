"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFundUpdate = exports.updateFundUpdate = exports.createFundUpdate = exports.getFundUpdateById = exports.getFundUpdates = void 0;
const FundUpdate_1 = require("../models/FundUpdate");
const getFundUpdates = async (_req, res) => {
    try {
        const fundUpdates = await FundUpdate_1.FundUpdate.find();
        return res.status(200).json(fundUpdates);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching fund updates', error });
    }
};
exports.getFundUpdates = getFundUpdates;
const getFundUpdateById = async (req, res) => {
    try {
        const fundUpdate = await FundUpdate_1.FundUpdate.findById(req.params.id);
        if (!fundUpdate) {
            return res.status(404).json({ message: 'Fund update not found' });
        }
        return res.status(200).json(fundUpdate);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching fund update', error });
    }
};
exports.getFundUpdateById = getFundUpdateById;
const createFundUpdate = async (req, res) => {
    try {
        const updateData = req.body;
        const update = new FundUpdate_1.FundUpdate(updateData);
        const savedUpdate = await update.save();
        res.status(201).json(savedUpdate);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating fund update', error });
    }
};
exports.createFundUpdate = createFundUpdate;
const updateFundUpdate = async (req, res) => {
    try {
        const fundUpdate = await FundUpdate_1.FundUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!fundUpdate) {
            return res.status(404).json({ message: 'Fund update not found' });
        }
        return res.status(200).json(fundUpdate);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating fund update', error });
    }
};
exports.updateFundUpdate = updateFundUpdate;
const deleteFundUpdate = async (req, res) => {
    try {
        const fundUpdate = await FundUpdate_1.FundUpdate.findByIdAndDelete(req.params.id);
        if (!fundUpdate) {
            return res.status(404).json({ message: 'Fund update not found' });
        }
        return res.status(200).json({ message: 'Fund update deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting fund update', error });
    }
};
exports.deleteFundUpdate = deleteFundUpdate;
//# sourceMappingURL=fundUpdateController.js.map