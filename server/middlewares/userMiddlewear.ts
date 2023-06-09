import argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { IUser } from "../models/userModel";

interface CustomSession extends Session {
  userId?: string;
  isAdmin?: boolean;
}

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
      (req.session as CustomSession).userId = user.userId;
      (req.session as CustomSession).isAdmin = user.isAdmin;
    }

    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Middleware to check if the user is an admin
export const adminCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = (req.session as CustomSession).isAdmin;

  // If user is not an admin, return an error
  if (!isAdmin) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
};

// Middleware to check if the user is signed in
export const signInCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.session as CustomSession).userId;

  next();
};