import { Request, Response } from 'express';
import argon2 from 'argon2';
import User, { IUser } from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('Received request to create user:', req.body);

    const { name, email, password } = req.body;
    const { isAdmin, userId, phone, address } = req.body; // Additional fields

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email is already registered');
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await argon2.hash(password);

    const userData: Partial<IUser> = { name, email, password: hashedPassword }; // Subset of fields

    const user: IUser = new User(userData);
    await user.save();

    console.log('User created successfully');

    // Check if user should be promoted to admin
    if (isAdmin && userId) {
      user.isAdmin = isAdmin;
      user.userId = userId;
      await user.save();
    }

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error });
  }
};

//SIGN IN COTROLLER STARTS HERE  
export const signInUser = async (req: Request, res: Response) => {
  try {
    console.log('Received request to sign in user:', req.body);

    const { email, password } = req.body;

    // Find the user by email
    const existingUser = await User.findOne({ email });

    // If user does not exist, return an error
    if (!existingUser) {
      console.log('User does not exist');
      return res.status(404).json({ error: 'User does not exist' });
    }

    // Verify the password
    const passwordMatch = await argon2.verify(existingUser.password, password);

    // If password does not match, return an error
    if (!passwordMatch) {
      console.log('Incorrect password');
      return res.status(401).json({ error: 'Incorrect password' });
    }

    req.session!.id = existingUser.id;
    req.session!.isAdmin = existingUser.isAdmin;
  

    // User authenticated successfully
    console.log('User signed in successfully');
    return res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    console.error('Error signing in user:', error);
    return res.status(500).json({ error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    return res.status(500).json({ error });
  }
}

//CHECK ADMIN
export const checkAdmin = (req: Request, res: Response) => {
  const isAdmin = req.session?.isAdmin || false;
  res.json({ isAdmin });
};