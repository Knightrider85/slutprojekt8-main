import express, { Request, Response } from 'express';
import User from '../models/userModel';

const userRouter = express.Router();

userRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userRouter;
