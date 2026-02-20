const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    console.log("Cookies:", req.cookies); // Debugging
    console.log("Token:", token); // Debugging

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: User not found"
            })
        }
        res.user = user
        next()
    }
    catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        })
    }
}

module.exports = authMiddleware 