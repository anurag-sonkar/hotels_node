const express = require("express")
const app = express()
const fs = require("fs")
require('dotenv').config();

const {passport,localAuthMiddleware} = require('./authentication')

const bodyParser = require("body-parser")
const personRoutes = require('./routes/person')
const menuRoutes = require('./routes/menu')


// PORT
const PORT = process.env.PORT || 8000


// mongoDb connection
const db = require("./dbConnection");


// middleware to parse json data into Js object
app.use(bodyParser.json())

const logRequest=(req,res,next)=>{
    const dataToSave = `\n${new Date().toLocaleString()} - ${req.url}`
    fs.appendFile("log.txt" , dataToSave , (err,res)=>{
        next()
    })
}
app.use(logRequest)

app.use(passport.initialize())


// routes
app.get('/', localAuthMiddleware, function(req,res){
    res.send("Welcome to my hotel...")
})

app.use('/person' ,localAuthMiddleware, personRoutes)
app.use('/menu', menuRoutes)












app.listen(PORT , ()=>console.log(`Server Running On PORT : ${PORT}`))