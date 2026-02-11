const postModel = require("../models/post.model")
const generateCaption = require("../services/ai.services")

async function createPostController  (req, res){
    const  file = req.file;

    const base64Image = new Buffer.from(file.Buffer).toString('base64');

    const caption = await generateCaption(base64Image);

    res.json({
        caption
    })
}

module.exports = {createPostController}

