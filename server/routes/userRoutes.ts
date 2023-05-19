import express from 'express';
import { createUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('api/users', createUser);

// Other user routes

export default userRouter;
