const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 8000

// mongoDb connection
const db = require("./dbConnection")

// 
const personRoutes = require('./routes/person')
const menuRoutes = require('./routes/menu')

// middleware to parse json data into Js object
app.use(bodyParser.json())


// routes
app.get('/' , function(req,res){
    res.send("Welcome to my hotel...")
})

app.use('/person' , personRoutes)
app.use('/menu', menuRoutes)












app.listen(PORT , ()=>console.log(`Server Running On PORT : ${PORT}`))