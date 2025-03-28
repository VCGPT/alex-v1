"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fund = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FundSchema = new mongoose_1.default.Schema({
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
    legalEntity: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    fundSize: {
        type: String,
        required: true,
        trim: true,
    },
    estimatedValue: {
        type: String,
        required: true,
        trim: true,
    },
    portfolio: [{
            type: String,
            ref: 'Investment',
        }],
    updates: [{
            type: String,
            ref: 'FundUpdate',
        }],
    limitedPartners: [{
            type: String,
            ref: 'LimitedPartner',
        }],
    documents: [{
            type: String,
            ref: 'Document',
        }],
}, {
    timestamps: true,
});
exports.Fund = mongoose_1.default.model('Fund', FundSchema);
//# sourceMappingURL=Fund.js.map