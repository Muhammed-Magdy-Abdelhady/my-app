import express from 'express';

import * as postsController from '../controllers/posts.js';


const router = express.Router();

router.get('/getPosts',postsController.getPosts);
router.post('/createPost',postsController.createPost);
router.delete('/deletePost/:id',postsController.deletePost);
router.patch('/updatePost/:id',postsController.updatePost);

export default router;

