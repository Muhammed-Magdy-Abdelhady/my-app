import Post from "../models/postsRequest.js";

export const getPosts = async (req, res) => {
    try {

        const posts = await Post.find();
        res.status(200).json(posts);
        console.log("getPosts");
    
    } catch (error) {

        res.status(404).json({ message: error.message });
    
    }
}


export const createPost = async (req, res) => {
    try {

        const newPost = new Post({
            title: req.body.title,
            message: req.body.message,
            creator: req.body.creator,
            tags: req.body.tags,
            selectedFile: req.body.selectedFile,
            likeCount: req.body.likeCount,
            createdAt: req.body.createdAt
        });
        console.log("create post");
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {

        res.status(404).json({ message: error.message });

    }
}

export const deletePost = async (req, res) => {
    try {
        console.log("delete post");
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted" });

    } catch (error) {

        res.status(404).json({ message: error.message });

    }
}

export const updatePost = async (req, res) => {
    try {
        console.log("update post");
        await Post.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "Post updated" });

    } catch (error) {

        res.status(404).json({ message: error.message });

    }
}

