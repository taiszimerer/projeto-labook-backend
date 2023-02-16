import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'

export const userRouter = express.Router()
const userController = new UserController(
    new UserBusiness(
        new UserDataBase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.get('/', userController.getUsers)
userRouter.post('/signup', userController.singup)
userRouter.post('/', userController.login)