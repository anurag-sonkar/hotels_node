const jwt = require("jsonwebtoken")
require('dotenv').config();

const jwtAuthMiddleware = (req,res,next)=>{

    // first check has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:"Token Not Found"})

    // extract jwt toke from header
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error : 'Unauthorized'})

    try {
        // verify token
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        // attach user information to the req object
        req.user = decoded
        next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json({error : 'Invalid token'})
        
    }

}

// function to generate JWT token
const generateToken = (userData)=>{
    // generate a new JWT token using user data
    return jwt.sign({userData} , process.env.JWT_SECRET)

}


module.exports = {jwtAuthMiddleware,generateToken}