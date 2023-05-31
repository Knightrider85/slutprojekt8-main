import argon2 from 'argon2';
import { Request, Response } from 'express';
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

//  create a session for the user
//  req.session! = {
  //  _id: existingUser?._id,
  //  isAdmin: user?.isAdmin,
  //  isSignedIn: true
//  }


     req.session.id = existingUser.id;
     req.session = existingUser.isAdmin;
     req.session!.isSignedIn = true; // Add a flag indicating the user is signed in

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
};

//CHECK ADMIN
export const checkAdmin = (req: Request, res: Response) => {
  const isAdmin = req.session?.isAdmin || false;
  res.json({ isAdmin });
};

//CHECK SIGNED IN
export const checkIsSignedIn = (req: Request, res: Response) => {
  const isSignedIn = req.session?.isSignedIn || false;
  res.json({ isSignedIn });
};

//DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log('Deleting user with userId:', userId);

    const deletedUser = await User.findByIdAndDelete(userId);
    console.log('Deleted user:', deletedUser);

    if (!deletedUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User deleted successfully');
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

// UPDATE THE USER´S isAdmin status
export const updateUserAdminStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { isAdmin } = req.body;

    //find the user in the database based on the userId
    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User admin status updated successfully' });
  } catch (error) {
    console.error('Error updating the user admin status', error);
    res.status(500).json({ error: 'An error occurred while updating the user admin status' });
  }
};

export const handleSignOutUser = (req: Request, res: Response) => {
  // Remove the user-related information from the session
  delete req.session!.userId;
  delete req.session!.isAdmin;
  delete req.session!.isSignedIn;

  // Send a response indicating successful sign-out
  res.json({ message: "Sign-out successful" });
};
