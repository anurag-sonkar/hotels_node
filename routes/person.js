const express = require("express");
const {
  handleAllPersonInfo,
  handlePersonCreate,
  handleFilterPersonWorkType,
  handleUpdatePersonInfo,
  handleDeletePersonInfo
} = require("../controllers/person");
const route = express.Router();

// route.get('/' , handleAllPersonInfo)
// route.post('/' , handleGetAllPersonInfo)

route.route("/")
.get(handleAllPersonInfo)
.post(handlePersonCreate)


route.put('/:id' , handleUpdatePersonInfo)
route.delete('/:id' , handleDeletePersonInfo)

route.get("/:workType", handleFilterPersonWorkType);

module.exports = route;
