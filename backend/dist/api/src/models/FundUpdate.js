"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundUpdate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FundUpdateSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    timestamps: true,
});
exports.FundUpdate = mongoose_1.default.model('FundUpdate', FundUpdateSchema);
//# sourceMappingURL=FundUpdate.js.map