const postModel = require("../models/post.model")
const generateCaption = require("../services/ai.services");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid")

async function createPostController(req, res) {
    const file = req.file;

    const base64Image = new Buffer.from(file.Buffer).toString('base64');

    const caption = await generateCaption(base64Image);

    const result = await uploadFile(file.buffer, `${uuidv4()}`)

    const post = await postModel.create({
        image: result.url,
        caption: caption,
        user: req.user._id
    })

    return res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getAllPostsController(req, res) {
    try {
        const posts = await postModel.find().populate('user');
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}

async function getUserPostsController(req, res) {
    try {
        const posts = await postModel.find({ user: req.user.id }).populate('user');
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch user posts" });
    }
}

module.exports = { createPostController, getAllPostsController, getUserPostsController }
