const mongoose = require("mongoose")

// mongodb connect
const db_name = "hotels"
const url = `mongodb://127.0.0.1:27017/${db_name}`

mongoose.connect(url)


// setup event listners
const db = mongoose.connection

db.on('connected' , ()=>console.log("Connected To MongoDb Server"))
db.on('error' , (error)=>console.log(error.message))
db.on('disconnected' , ()=>console.log("MongoDb disconnected"))

module.exports = db