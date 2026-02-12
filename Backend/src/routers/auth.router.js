const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const { register, login, logout, getMe } = require("../controllers/auth.controllers.js")

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authMiddleware, getMe)


module.exports = router