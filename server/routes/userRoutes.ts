import express from 'express';
import { checkAdmin, createUser, getAllUsers, signInUser } from '../controllers/userController';
import { adminCheckMiddleware } from '../middlewares/userMiddlewear';

const userRouter = express.Router();

userRouter.post('/api/users', createUser);
userRouter.post('/api/signIn', signInUser);
userRouter.get('/api/users/all', adminCheckMiddleware, getAllUsers)
userRouter.get('/api/checkAdmin', checkAdmin);


// Other user routes

export default userRouter;
