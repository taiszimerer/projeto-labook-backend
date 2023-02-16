import express from 'express'
import { PostsController } from '../controller/PostsController'

export const postsRouter = express.Router()
const postsController = new PostsController()

// postsRouter.get('/', postsController.getPosts)

// postsRouter.post('/', postsController.createPost)

// postsRouter.put("/:id", postsController.editPost)

// postsRouter.delete("/:id", postsController.deletePost)

// postsRouter.put('/:id/like', postsController.likeOrDislike)