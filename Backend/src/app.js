const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/auth.router")
const cookiparser = require("cookie-parser")
const postRoute = require('./routers/post.route')

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Backend is running');
})

app.use(express.json())
app.use(cookiparser())
app.use("/api/auth", userRouter)
app.use("/api/post", postRoute)

module.exports = app