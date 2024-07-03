const Person = require("../models/person")

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
        res.status(201).json({"message":response})
        
        
    } catch (error) {
        res.status(500).json({"message":error.message})
        
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

module.exports = {handleAllPersonInfo ,handlePersonCreate ,handleFilterPersonWorkType ,handleUpdatePersonInfo,handleDeletePersonInfo}