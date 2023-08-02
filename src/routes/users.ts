import express from 'express';
import { UserController } from '../controllers/UserController';
import { authToken } from '../middlewares/auth';

export const userRouter = express.Router();
const controller = new UserController();

userRouter.get('/', authToken, controller.getUsers);
userRouter.get('/:id', authToken, controller.getUserById);
userRouter.put('/:id', authToken, controller.updateUser);
userRouter.delete('/:id', authToken, controller.deleteUser);
userRouter.get('/username/:username', authToken, controller.getUserByUsername);
