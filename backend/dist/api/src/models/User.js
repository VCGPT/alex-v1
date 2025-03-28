"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    investments: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Investment'
        }],
    funds: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Fund'
        }],
    documents: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Document'
        }]
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map