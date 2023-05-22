import argon2 from 'argon2';
import { Request, Response } from 'express';
import User from '../models/userModel';

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

    // if (req.session) {
    //     req.session.userId = existingUser.userId;
    //     req.session.isAdmin = existingUser.isAdmin;
    // }

    // User authenticated successfully
    console.log('User signed in successfully');
    return res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    console.error('Error signing in user:', error);
    return res.status(500).json({ error });
  }
};
