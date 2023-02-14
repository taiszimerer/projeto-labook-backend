import express from 'express'
import { UsersController } from '../controller/UsersController'

export const usersRouter = express.Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.getUsers)

usersRouter.post('/', usersController.singUp)

usersRouter.post('/', usersController.login)