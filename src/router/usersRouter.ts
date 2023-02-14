import express, { Request, Response } from 'express'
import { UsersController } from '../controller/UsersController'
import { db } from '../database/knex'

export const usersRouter = express.Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.getUsers)

//Signup ok //
usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string
        const role = req.body.role as string

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        //duvida: ver se coloca verificação para o role ou nao 

        await db("users").insert({ id, name, email, password, role })
        res.status(201).send("Cadastro de usuário registrado com sucesso")

        //falta token JWT

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Login pendente logica // PENDENTE TOKEN
usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const emailToLogin = req.params.email 
        const passwordToLogin = req.params.password 

        const [ user ] = await db("users").where({ email: emailToLogin } && {password: passwordToLogin})

        if (!user) {
            res.status(404)
            throw new Error("'email e senha' não correspondem")
        }

        await db("users").select().where({ email: emailToLogin } && {password: passwordToLogin})
        res.status(201).send("Login realizado com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})