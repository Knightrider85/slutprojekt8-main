import { Request, Response } from 'express';
import argon2 from 'argon2';
import User, { IUser } from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('Received request to create user:', req.body);

    const { name, email, password, } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email is already registered');
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await argon2.hash(password);

    const user: IUser = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('User created successfully');
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error });
  }
};


// Other user controller methods (e.g., getUser, updateUser, deleteUser)
