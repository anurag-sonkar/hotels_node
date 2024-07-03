const express = require("express")
const {handlePersonCreate,
    handleMenuInfo , handleFilterMenuTasteType ,handleUpdateMenuInfo,
    handleDeleteMenuInfo} = require("../controllers/menu")

const route = express.Router()


route.route('/')
.get(handleMenuInfo)
.post(handlePersonCreate)

route.put('/:id' , handleUpdateMenuInfo)
route.delete('/:id' , handleDeleteMenuInfo)

route.get("/:tasteType", handleFilterMenuTasteType);


module.exports = route
