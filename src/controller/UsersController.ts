import { Request, Response } from "express"
import { db } from "../database/knex"

export class UsersController {
    constructor() {}
    
    //Users - apenas verificação (endpoint não obrigatório) ok //
    public getUsers = async (req: Request, res: Response) => {
        try {
            const result = await db.select("*").from("users")
            res.status(200).send(result)
    
        } catch (error: any) {
            console.log(error)
            if (res.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

}