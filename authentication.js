const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy // specially designed for username and passsword authentication
const Person = require("./models/person");

// auth - username and password

/* 1.const auth = (username , password ,done)=>{ ........... }*/

// 2.const ref = new LocalStrategy(auth)
// 3.passport.use(ref)

/* 4.done(error,user,info)
 if successfull - done(null,user)
 if fails - done(null , false , {message : "Inavlid username/password"})*/

/* 5. app.use(passport.initialize()) */

const auth = async(username , password , done)=>{
        try {
        const user = await Person.findOne({username : username})

        if(!user){
            return done(null, false , {message : "Invalid Username"})
        }

        // const isPasswordMatch = user.password === password ? true : false
        const isPasswordMatch = await user.comparePassword(password)

        if(isPasswordMatch){
            return done(null,user)
        }else{
            return done(null , false , {message : "Incorrect Password"})

        }
    } catch (error) {
        return done(null , false , {message : error.message})
    }

}

const ref = new LocalStrategy(auth)

passport.use(ref) //object of LocalStategy(function(username , passw , done))


// passport.authenticate('stategy name',{session:false})
const localAuthMiddleware =  passport.authenticate('local',{session:false})

module.exports = {passport,localAuthMiddleware}

