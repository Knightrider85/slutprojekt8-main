import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/userModel';

// Middleware to hash user password using argon2
export const Products = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const user = req.body as IUser;

    if (req.session) {
      req.session.userId = user.userId;
      req.session.isAdmin = user.isAdmin;
    }

    next();
  };
