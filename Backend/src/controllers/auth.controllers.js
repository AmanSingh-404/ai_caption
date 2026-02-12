const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function register(req, res) {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })

    if (user) {
        return res.status(400).json({ message: "User already exists" })
    }

    const newUser = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3600h" })
    res.cookie("token", token)

    return res.status(201).json({ message: "User created successfully" })
}

async function login(req, res) {
    const { username, password } = req.body

    const user = await userModel.findOne({ username })

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3600h" })
    res.cookie("token", token)

    return res.status(200).json({ message: "User logged in successfully" })
}

async function logout(req, res) {
    res.clearCookie("token")
    return res.status(200).json({ message: "User logged out successfully" })
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id).select("-password")
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ user })
}

module.exports = { register, login, logout, getMe }
