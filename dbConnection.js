require('dotenv').config();
const mongoose = require("mongoose")

// mongodb connect
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL =  process.env.MONGODB_URL

mongoose.connect(mongoURL)


// setup event listners
const db = mongoose.connection

db.on('connected' , ()=>console.log("Connected To MongoDb Server"))
db.on('error' , (error)=>console.log(error.message))
db.on('disconnected' , ()=>console.log("MongoDb disconnected"))

module.exports = db