import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

//Users - apenas verificação (endpoint não obrigatório)
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

//Signup
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

//Login
app.post('/users', async (req: Request, res: Response) => {
    try {
        const email = req.body.email as string
        const password = req.body.password as string

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        await db("users").insert({ email, password })
        res.status(201).send("Login realizado com sucesso")

        //falta token JWT

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Get Posts
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

//Create Post
app.post('/posts', async (req: Request, res: Response) => {
    try {
        const content = req.body.content as string
        //falta token JWT

        if (typeof content !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        await db("users").insert({ content })
        res.status(201).send("Post criado com sucesso")



    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Edit Post
app.put('/posts/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newContent = req.body.name as string | undefined

        // const result = posts.find((post) => post.id === id)

        // if (!result) {
        //     res.status(400)
        //     throw new Error("Post não existente. Impossível editar")
        // }

        if (typeof newContent !== "string") {
            res.status(400)
            throw new Error("'content' deve ser do tipo string")
        }

        // if (result) {
        //     result.content = newContent || result.content
        // }

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Delete Post 
app.delete('/posts/:id', (req: Request, res: Response) => {
    try {
        //"token jwt"
        const id = req.params.id as string  

        // const postIndex = posts.findIndex((post) => {
        //     return post.id === id
        // })

        // console.log("index:", postIndex)
        res.status(200).send("Publicação deletada com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//like or Dislike Post  FAZER LOGICA Funcionalidade 1
app.put('/posts/:id/like', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newLike= req.body.like as string | undefined

        // const result = posts.find((post) => post.id === id)

        // if (!result) {
        //     res.status(400)
        //     throw new Error("Post não existente. Impossível editar")
        // }

        if (typeof newLike !== "string") {
            res.status(400)
            throw new Error("'content' deve ser do tipo string")
        }

        // if (result) {
        //     result.content = newContent || result.content
        // }

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//like or Dislike Post  FAZER LOGICA Funcionalidade 2
app.put('/posts/:id/like', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newLike= req.body.like as string | undefined

        // const result = posts.find((post) => post.id === id)

        // if (!result) {
        //     res.status(400)
        //     throw new Error("Post não existente. Impossível editar")
        // }

        if (typeof newLike !== "string") {
            res.status(400)
            throw new Error("'content' deve ser do tipo string")
        }

        // if (result) {
        //     result.content = newContent || result.content
        // }

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
