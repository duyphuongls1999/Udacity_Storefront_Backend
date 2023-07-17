import express from 'express';
import UsersControllers from '../app/controllers/UsersController';
import authToken from '../app/middlewares/auth';

const userRouter = express.Router()
const controller = new UsersControllers()

userRouter.get('/', controller.getUsers)
userRouter.get('/:id', controller.getUserById)
userRouter.post('/create', controller.createUser)
userRouter.put('/:id', authToken, controller.updateUser)
userRouter.delete('/:id', authToken, controller.deleteUser)

export default userRouter
