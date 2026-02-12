const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const { createPostController, getAllPostsController, getUserPostsController } = require("../controllers/post.controller")
const multer = require("multer")

const upload = multer({ storage: multer.memoryStorage() })

router.post("/", authMiddleware, upload.single("image"), createPostController)
router.get("/", getAllPostsController)
router.get("/user", authMiddleware, getUserPostsController)

module.exports = router