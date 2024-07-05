const Person = require("../models/person")
const {generateToken} = require('../jwt')

async function handleAllPersonInfo(req,res){
    try {
        const queryResult = await Person.find()
        res.status(200).json(queryResult)
        
        
    } catch (error) {
        
        res.status(500).json({"message":error.message})
        
    }

}


async function handlePersonCreate(req,res){
    const body = req.body
    try {
        const response = await Person.create(body)
        
        const payload = {
            id : response.id,
            username:response.username
        }
        const token = generateToken(payload)
        res.status(201).json({response:response , token:token})
        
        
    } catch (error) {
        res.status(500).json({"message":error.message})
        
    }
    
}

async function handlePersonLogin(req,res){
    try {
        // extract username and password from body
        const {username , password} = req.body

        // find the user by name
        const user = await Person.findOne({username:username})

        // if user doesnot exists or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'})

        }

        // generate token
        const payload = {
            id:user.id,
            username:user.username
        }
        const token = generateToken(payload)

        // return token as response
        res.json({token})

    } catch (error) {
        console.log(error)
        res.status(500).json({error : error.message})
        
    }
    
}


async function handleShowLoggnedPersonProfile(req,res){
    try {
        const userData = req.user
        console.log("Logged_user", userData)

        const userId = userData.id
        const user = await Person.findById(userId)

        res.status(200).json({user})
        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({error : error.message})
        
    }

}

async function handleFilterPersonWorkType(req,res){
    try {
        const workType = req.params.workType
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const resultQuery = await Person.find({work:workType})
            return res.status(200).json(resultQuery)
            
        }else{
            return res.status(404).json({error:'Invalid work type'})
        }
        
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
}

const handleUpdatePersonInfo = async(req,res)=>{
    try {
        const id = req.params.id
        const updatePersonData = req.body
        
        const response = await Person.findByIdAndUpdate(id , updatePersonData ,{
            new:true,  //updated document return 
            runValidators:true
        })

        // agar user nhi find hua 
        if(!response) return res.status(404).json({error : "Person Not Found"})

        return res.status(201).json(response)

        
    } catch (error) {
        return res.status(500).json({message: error.message})

        
    }
}

const handleDeletePersonInfo = async(req,res)=>{
    try {
        const id = req.params.id
        
        const response = await Person.deleteOne({_id : id})

        // agar user nhi find hua 
        if(!response) return res.status(404).json({error : "Person Not Found"})

        return res.status(200).json(response)

        
    } catch (error) {
        return res.status(500).json({message: error.message})

        
    }

}

module.exports = {handleAllPersonInfo ,handlePersonCreate ,handlePersonLogin,handleShowLoggnedPersonProfile,handleFilterPersonWorkType ,handleUpdatePersonInfo,handleDeletePersonInfo}