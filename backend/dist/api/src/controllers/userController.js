"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const userData = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            investments: [],
            funds: [],
            documents: [],
        };
        const user = new User_1.User(userData);
        const savedUser = await user.save();
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        return res.status(201).json(userResponse);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};
exports.createUser = createUser;
const getUsers = async (_req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching user', error });
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map