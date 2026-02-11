const express = require("express")
const userRouter = require("./routers/user.router")
const cookiparser = require("cookie-parser")
const  postRoute = require('./routers/post.route')

const app = express()

app.use(express.json())
app.use(cookiparser())
app.use("/api/auth", userRouter) 
app.use("/api/post", postRoute)

module.exports = app