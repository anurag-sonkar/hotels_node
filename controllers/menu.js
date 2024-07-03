const MenuItem = require("../models/menu")

async function handlePersonCreate(req,res){
    const body = req.body
    try {
        const response = await MenuItem.create(body)
        res.status(201).json({"message":response})
        
        
    } catch (error) {
        res.status(500).json({"message":error.message})
        
    }
}


async function handleMenuInfo(req,res){
    try {
        const queryResult = await MenuItem.find()
        res.status(200).json(queryResult)
        
        
    } catch (error) {
        
        res.status(500).json({"message":error.message})
        
    }
}


async function handleFilterMenuTasteType(req,res){
    try {
        const tasteType = req.params.tasteType
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const resultQuery = await MenuItem.find({taste:tasteType})
            return res.status(200).json(resultQuery)

        }else{
            return res.status(404).json({error:'Invalid work type'})
        }
        
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }

}

//
const handleUpdateMenuInfo = async(req,res)=>{
    try {
        const id = req.params.id
        const updateMenuData = req.body
        
        const response = await MenuItem.findByIdAndUpdate(id , updateMenuData ,{
            new:true,  //updated document return 
            runValidators:true
        })

        // agar user nhi find hua 
        if(!response) return res.status(404).json({error : "MenuItem Not Found"})

        return res.status(201).json(response)

        
    } catch (error) {
        return res.status(500).json({message: error.message})

        
    }
}

const handleDeleteMenuInfo = async(req,res)=>{
    try {
        const id = req.params.id
        
        const response = await MenuItem.deleteOne({_id : id})

        // agar user nhi find hua 
        if(!response) return res.status(404).json({error : "MenuItem Not Found"})

        return res.status(200).json(response)

        
    } catch (error) {
        return res.status(500).json({message: error.message})

        
    }

}

module.exports = {handlePersonCreate,
    handleMenuInfo,handleFilterMenuTasteType , handleUpdateMenuInfo,
    handleDeleteMenuInfo}