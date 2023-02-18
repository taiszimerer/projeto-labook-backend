import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostInputDTO, EditPostInputDTO, GetPostInputDTO } from "../dtos/postDTO";
import { BaseError } from "../errors/BaseError";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) {}

    public getPosts = async (req: Request, res: Response) => {
        try {

        const input: GetPostInputDTO = {
            token: req.headers.authorization
        }

        const output = await this.postBusiness.getPosts(input)
        res.status(200).send(output)
        
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: CreatePostInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }
    
            const output = await this.postBusiness.createPost(input)
            res.status(201).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input: EditPostInputDTO = {
                idToEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }
    
            const output = await this.postBusiness.editPost(input)
            res.status(200).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


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