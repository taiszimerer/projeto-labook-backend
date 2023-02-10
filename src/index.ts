import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

//Users - apenas verificação (endpoint não obrigatório) ok //
app.get('/users', async (req: Request, res: Response) => {
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
})

//Signup ok //
app.post('/users', async (req: Request, res: Response) => {
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
app.post('/users', async (req: Request, res: Response) => {
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

//Get Posts OK //
app.get('/posts', async (req: Request, res: Response) => {
    try {

        //requer token JWT para acessar 

        const result = await db.select("*").from("posts")
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
})

//Create Post OK //
app.post('/posts', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const creator_id = req.body.creator_id as string
        const content = req.body.content as string
        const likes = req.body.likes as number
        const dislikes = req.body.dislikes as number

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof creator_id !== "string") {
            res.status(400)
            throw new Error("'creator_id' deve ser string")
        }

        if (typeof content !== "string") {
            res.status(400)
            throw new Error("'content' deve ser string")
        }

        if (typeof likes !== "number") {
            res.status(400)
            throw new Error("'likes' deve ser do tipo number")
        }

        if (typeof dislikes !== "number") {
            res.status(400)
            throw new Error("'dislikes' deve ser do tipo number")
        }

        await db("posts").insert({ id, creator_id, content, likes, dislikes })
        res.status(201).send("Post criado com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Edit Post OK // 
app.put("/posts/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newContent = req.body.content

        if (newContent !== undefined) {

            if (typeof newContent !== "string") {
                res.status(400)
                throw new Error("'content' deve ser string")
            }

            if (newContent.length < 2) {
                res.status(400)
                throw new Error("'content' deve possuir no mínimo 2 caracteres")
            }
        }

        const [post] = await db.select("*").from("posts").where({ id: id })

        if (post) {

            await db.update({
                content: newContent || post.content,
            }).from("posts").where({ id: id })

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send({ message: "Atualização realizada com sucesso" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Delete Post OK//
app.delete("/posts/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [ post ] = await db("posts").where({ id: idToDelete })

        if (!post) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        await db("posts").del().where({ id: idToDelete })

        res.status(200).send({ message: "Post deletado com sucesso" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//like or Dislike Post  MESMO ENDPOINT PROS DOIS // PENDENT LOGICA
app.put('/posts/:id/like', (req: Request, res: Response) => {
    try {
  
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
