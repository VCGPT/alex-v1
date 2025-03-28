"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitedPartner = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LimitedPartnerSchema = new mongoose_1.default.Schema({
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
    email: {
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
    legalEntity: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
exports.LimitedPartner = mongoose_1.default.model('LimitedPartner', LimitedPartnerSchema);
//# sourceMappingURL=LimitedPartner.js.map