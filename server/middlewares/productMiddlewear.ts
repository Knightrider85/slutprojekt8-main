import { NextFunction, Request, Response } from 'express';

export const adminCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = req.session?.isAdmin;

  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
};
