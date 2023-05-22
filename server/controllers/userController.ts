import { Request, Response } from 'express';
import argon2 from 'argon2';
import User, { IUser } from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('Received request to create user:', req.body); // Add this line

    const { name, email, password, userId, isAdmin } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Create a new user with the hashed password
    const user: IUser = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other user controller methods (e.g., getUser, updateUser, deleteUser)
