import express from 'express';
import { createUser } from '../controllers/createUserController';
import { signInUser } from '../controllers/signInController';

const userRouter = express.Router();

userRouter.post('/api/users', createUser);
userRouter.post('/api/signIn', signInUser);

// Other user routes

export default userRouter;
