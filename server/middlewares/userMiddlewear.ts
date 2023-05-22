import argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/userModel';

// Middleware to hash user password using argon2
export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Replace the plain text password with the hashed password
    req.body.password = hashedPassword;

    // Set user session data
    const user = req.body as IUser;

    if (req.session) {
      req.session.userId = user.userId;
      req.session.isAdmin = user.isAdmin;
    }

    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};