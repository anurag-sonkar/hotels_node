const express = require("express");
const {
  handleAllPersonInfo,
  handlePersonCreate,
  handleFilterPersonWorkType,
  handleUpdatePersonInfo,
  handleDeletePersonInfo,
  handlePersonLogin,
  handleShowLoggnedPersonProfile
} = require("../controllers/person");
const { jwtAuthMiddleware } = require("../jwt");
const route = express.Router();

route.post('/signup' ,jwtAuthMiddleware, handlePersonCreate)
route.post('/login',jwtAuthMiddleware, handlePersonLogin)
route.get('/profile' ,jwtAuthMiddleware, handleShowLoggnedPersonProfile)
route.get('/' ,jwtAuthMiddleware, handleAllPersonInfo)

// route.route("/")
// .get(handleAllPersonInfo)
// .post(handlePersonCreate)


route.put('/:id' , handleUpdatePersonInfo)
route.delete('/:id' , handleDeletePersonInfo)

route.get("/:workType", handleFilterPersonWorkType);

module.exports = route;
