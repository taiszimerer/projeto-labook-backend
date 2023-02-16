import { Request, Response } from "express"
// import { db } from "../database/BaseDatabase"

export class PostsController {
    constructor() {}

    //Get Posts OK //
    // public getPosts = async (req: Request, res: Response) => {
    //     try {
    
    //         //requer token JWT para acessar 
    
    //         const result = await db.select("*").from("posts")
    //         res.status(200).send(result)
    
    //     } catch (error: any) {
    //         console.log(error)
    //         if (res.statusCode === 200) {
    //             res.status(500)
    //         }
    
    //         if (error instanceof Error) {
    //             res.send(error.message)
    //         } else {
    //             res.send("Erro inesperado")
    //         }
    //     }
    // }

    //Create Post OK //
    // public createPost = async (req: Request, res: Response) => {
    //     try {
    //         const id = req.body.id as string
    //         const creator_id = req.body.creator_id as string
    //         const content = req.body.content as string
    //         const likes = req.body.likes as number
    //         const dislikes = req.body.dislikes as number
    
    //         if (typeof id !== "string") {
    //             res.status(400)
    //             throw new Error("'id' deve ser string")
    //         }
    
    //         if (typeof creator_id !== "string") {
    //             res.status(400)
    //             throw new Error("'creator_id' deve ser string")
    //         }
    
    //         if (typeof content !== "string") {
    //             res.status(400)
    //             throw new Error("'content' deve ser string")
    //         }
    
    //         if (typeof likes !== "number") {
    //             res.status(400)
    //             throw new Error("'likes' deve ser do tipo number")
    //         }
    
    //         if (typeof dislikes !== "number") {
    //             res.status(400)
    //             throw new Error("'dislikes' deve ser do tipo number")
    //         }
    
    //         await db("posts").insert({ id, creator_id, content, likes, dislikes })
    //         res.status(201).send("Post criado com sucesso")
    
    //     } catch (error: any) {
    //         console.log(error)
    //         if (res.statusCode === 200) {
    //             res.status(500)
    //         }
    //         res.send(error.message)
    //     }
    // }

//     //Edit Post OK // 
//     public editPost = async (req: Request, res: Response) => {
//         try {
//             const id = req.params.id
//             const newContent = req.body.content
    
//             if (newContent !== undefined) {
    
//                 if (typeof newContent !== "string") {
//                     res.status(400)
//                     throw new Error("'content' deve ser string")
//                 }
    
//                 if (newContent.length < 2) {
//                     res.status(400)
//                     throw new Error("'content' deve possuir no mínimo 2 caracteres")
//                 }
//             }
    
//             const [post] = await db.select("*").from("posts").where({ id: id })
    
//             if (post) {
    
//                 await db.update({
//                     content: newContent || post.content,
//                 }).from("posts").where({ id: id })
    
//             } else {
//                 res.status(404)
//                 throw new Error("'id' não encontrada")
//             }
    
//             res.status(200).send({ message: "Atualização realizada com sucesso" })
    
//         } catch (error) {
//             console.log(error)
    
//             if (req.statusCode === 200) {
//                 res.status(500)
//             }
    
//             if (error instanceof Error) {
//                 res.send(error.message)
//             } else {
//                 res.send("Erro inesperado")
//             }
//         }
//     }

//     //Delete Post OK//
//     public deletePost = async (req: Request, res: Response) => {
//         try {
//             const idToDelete = req.params.id
    
//             const [ post ] = await db("posts").where({ id: idToDelete })
    
//             if (!post) {
//                 res.status(404)
//                 throw new Error("'id' não encontrada")
//             }
    
//             await db("posts").del().where({ id: idToDelete })
    
//             res.status(200).send({ message: "Post deletado com sucesso" })
//         } catch (error) {
//             console.log(error)
    
//             if (req.statusCode === 200) {
//                 res.status(500)
//             }
    
//             if (error instanceof Error) {
//                 res.send(error.message)
//             } else {
//                 res.send("Erro inesperado")
//             }
//         }
//     }
    
//     //like or Dislike Post  MESMO ENDPOINT PROS DOIS // PENDENT LOGICA
//     public likeOrDislike = async (req: Request, res: Response) => {
//         try {
      
//         } catch (error: any) {
//             console.log(error)
//             if (res.statusCode === 200) {
//                 res.status(500)
//             }
//             res.send(error.message)
//         }
    
//     }
    
// 
}