"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Investment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InvestmentSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
exports.Investment = mongoose_1.default.model('Investment', InvestmentSchema);
//# sourceMappingURL=Investment.js.map