import express from 'express';
import { signInUser } from '../controllers/signInController';
import { createUser } from '../controllers/createUserController';

const userRouter = express.Router();

userRouter.post('/users', createUser);
userRouter.post('/signIn', signInUser);

// Other user routes

export default userRouter;
