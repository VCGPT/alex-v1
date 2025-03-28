import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    investments: mongoose.Types.ObjectId[];
    funds: mongoose.Types.ObjectId[];
    documents: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment'
    }],
    funds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fund'
    }],
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }]
}, {
    timestamps: true,
});

export const User = mongoose.model<IUser>('User', UserSchema);