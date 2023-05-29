import express from 'express';
import { checkAdmin, createUser, deleteUser, getAllUsers, handleSignOutUser, signInUser, updateUserAdminStatus } from '../controllers/userController';
import { adminCheckMiddleware, signInCheckMiddleware } from '../middlewares/userMiddlewear';

const userRouter = express.Router();

userRouter.post('/api/users', createUser);
userRouter.post('/api/signIn', signInCheckMiddleware, signInUser);
userRouter.get('/api/users/all', adminCheckMiddleware, getAllUsers)
userRouter.get('/api/checkAdmin', signInCheckMiddleware, checkAdmin);
userRouter.delete('/api/users/:userId', adminCheckMiddleware, deleteUser);
userRouter.put('/api/users/:userId', adminCheckMiddleware, updateUserAdminStatus)
userRouter.post('/api/signOut', handleSignOutUser)

export default userRouter;
