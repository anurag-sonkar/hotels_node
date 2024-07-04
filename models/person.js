const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
// defining person schema
const personSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef' , 'waiter' , 'manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true

    }
})


/** */
//pre - middleware function triggerd when we perform save operation
personSchema.pre('save' , async function(next){

    const person = this
    // hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next()

    try {
        // hash password salt
        const salt = await bcrypt.genSalt(10)

        // hash password
        const hashedPassword = await bcrypt.hash(person.password , salt)

        // override plain password with hashed one
        person.password = hashedPassword

        next()
    } catch (error) {
        return next(error)
    }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // use bcryt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
        
    } catch (error) {
        throw error
        
    }
}



// person Model - through which we can perform all operations
const Person = mongoose.model('Person' , personSchema)

module.exports = Person