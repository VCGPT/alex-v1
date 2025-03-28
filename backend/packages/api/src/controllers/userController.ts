import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import { Investment } from '../models/Investment';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { Document} from 'mongoose';
import { Fund } from '../models/Fund';

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

// Create a new user (admin only)
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const userData: Omit<IUser, keyof Document> = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      investments: [],
      funds: [],
      documents: [],
    };

    const user = new User(userData);
    const savedUser = await user.save();

    // Return user without password
    const userResponse = savedUser.toObject();
    delete (userResponse as any).password;
    return res.status(201).json(userResponse);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all users (admin only)
export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user', error });
  }
};


// Get all investments for a user
export const getUserInvestments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // First, get the user and their investment IDs
    const user = await User.findById(userId).select('investments');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all investments by their IDs
    const investments = await Promise.all(
      user.investments.map(async (investmentId) => {
        try {
          const investment = await Investment.findById(investmentId).select('-__v');
          return investment;
        } catch (err) {
          console.error('Error fetching investment:', investmentId, err);
          return null;
        }
      })
    );

    // Filter out any null values (in case some investments were deleted)
    const validInvestments = investments.filter(investment => investment !== null);

    return res.status(200).json(validInvestments);
  } catch (error) {
    console.error('Error in getUserInvestments:', error);
    return res.status(500).json({ 
      message: 'Error fetching user investments',
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// // Get all funds for a user
export const getUserFunds = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // First, get the user and their investment IDs
    const user = await User.findById(userId).select('funds');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all investments by their IDs
    const funds = await Promise.all(
      user.funds.map(async (fundId) => {
        try {
          const fund = await Fund.findById(fundId).select('-__v');
          return fund;
        } catch (err) {
          console.error('Error fetching investment:', fundId, err);
          return null;
        }
      })
    );

    // Filter out any null values (in case some investments were deleted)
    const validFunds = funds.filter(fund => fund !== null);

    return res.status(200).json(validFunds);
  } catch (error) {
    console.error('Error in getUserInvestments:', error);
    return res.status(500).json({ 
      message: 'Error fetching user investments',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}; 


// // Login user
// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '24h' }
//     );

//     // Return user without password and token
//     const userResponse = user.toObject();
//     delete (userResponse as any).password;
//     res.status(200).json({ user: userResponse, token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// };

// // Update a user
// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { password, ...updateData } = req.body;

//     // If password is being updated, hash it
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       updateData.password = await bcrypt.hash(password, salt);
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating user', error });
//   }
// };

// // Delete a user
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user', error });
//   }
// };
// // Get current user profile
export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

