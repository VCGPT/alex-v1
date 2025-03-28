"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLimitedPartner = exports.updateLimitedPartner = exports.createLimitedPartner = exports.getLimitedPartnerById = exports.getLimitedPartners = void 0;
const LimitedPartner_1 = require("../models/LimitedPartner");
const getLimitedPartners = async (_req, res) => {
    try {
        const limitedPartners = await LimitedPartner_1.LimitedPartner.find();
        return res.status(200).json(limitedPartners);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching limited partners', error });
    }
};
exports.getLimitedPartners = getLimitedPartners;
const getLimitedPartnerById = async (req, res) => {
    try {
        const limitedPartner = await LimitedPartner_1.LimitedPartner.findById(req.params.id);
        if (!limitedPartner) {
            return res.status(404).json({ message: 'Limited partner not found' });
        }
        return res.status(200).json(limitedPartner);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching limited partner', error });
    }
};
exports.getLimitedPartnerById = getLimitedPartnerById;
const createLimitedPartner = async (req, res) => {
    try {
        const limitedPartnerData = req.body;
        const limitedPartner = new LimitedPartner_1.LimitedPartner(limitedPartnerData);
        const savedLimitedPartner = await limitedPartner.save();
        res.status(201).json(savedLimitedPartner);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating limited partner', error });
    }
};
exports.createLimitedPartner = createLimitedPartner;
const updateLimitedPartner = async (req, res) => {
    try {
        const limitedPartner = await LimitedPartner_1.LimitedPartner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!limitedPartner) {
            return res.status(404).json({ message: 'Limited partner not found' });
        }
        return res.status(200).json(limitedPartner);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating limited partner', error });
    }
};
exports.updateLimitedPartner = updateLimitedPartner;
const deleteLimitedPartner = async (req, res) => {
    try {
        const limitedPartner = await LimitedPartner_1.LimitedPartner.findByIdAndDelete(req.params.id);
        if (!limitedPartner) {
            return res.status(404).json({ message: 'Limited partner not found' });
        }
        return res.status(200).json({ message: 'Limited partner deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting limited partner', error });
    }
};
exports.deleteLimitedPartner = deleteLimitedPartner;
//# sourceMappingURL=limitedPartnerController.js.map