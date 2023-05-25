import express from 'express';
import { checkAdmin, createUser, deleteUser, getAllUsers, handleSignOutUser, signInUser, updateUserAdminStatus } from '../controllers/userController';
import { adminCheckMiddleware } from '../middlewares/userMiddlewear';

const userRouter = express.Router();

userRouter.post('/api/users', createUser);
userRouter.post('/api/signIn', signInUser);
userRouter.get('/api/users/all', adminCheckMiddleware, getAllUsers)
userRouter.get('/api/checkAdmin', checkAdmin);
userRouter.delete('/api/users/:userId', adminCheckMiddleware, deleteUser);
userRouter.put('/api/users/:userId', adminCheckMiddleware, updateUserAdminStatus)
userRouter.post('/api/signOut', handleSignOutUser)


// Other user routes

export default userRouter;
