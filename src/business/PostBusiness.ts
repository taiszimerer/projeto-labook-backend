import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetPostOutputDTO } from "../dtos/postDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostDB, PostWithCreatorsDB } from "../types";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getPosts = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {
        const { token } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token invalido")
        }

        const postsWithCreatorsDB: PostWithCreatorsDB[] = await this.postDatabase
            .getPostsWithCreators()

        const posts = postsWithCreatorsDB.map((postWithCreatorDB) => {
            const post = new Post(
                postWithCreatorDB.id,
                postWithCreatorDB.content,
                postWithCreatorDB.likes,
                postWithCreatorDB.dislikes,
                postWithCreatorDB.created_at,
                postWithCreatorDB.updated_at,
                postWithCreatorDB.creator_id,
                postWithCreatorDB.creator_name
            )
            return post.toBusinessModel()
        })
        const output: GetPostOutputDTO = posts
        return output

    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {
        const { token, content } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token invalido")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name

        const post = new Post(
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            creatorId,
            creatorName
        )

        const postDB = post.toDBModel()
        await this.postDatabase.insert(postDB)
    }

    public editPost = async (input: EditPostInputDTO): Promise<void> => {
        const { idToEdit, content, token } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token invalido")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const postDB = await this.postDatabase.findById(idToEdit)

        if (!postDB) {
            throw new NotFoundError("id não encontrado")
        }

        const creatorId = payload.id

        if (postDB.creator_id !== payload.id){
            throw new BadRequestError("Somente o criador do post pode edita-lo.") 
        }

        const creatorName = payload.name

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            creatorId, 
            creatorName
        )

        post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())

        const updatedPostDB = post.toDBModel()
        await this.postDatabase.update(idToEdit, updatedPostDB)
    }

}