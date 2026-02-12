const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authMiddleware (req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"unotherized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        res.user = user
        next()
    }
    catch(err){
        return res.status(403).json({
                message:"forbidden"
        })
    }
}

module.exports = authMiddleware 