const express = require("express");
const userModel = require("../models/userModel");
const {registerController, loginController} = require('../controllers/usercontroller')
const router = express.Router();

router.post("/register", registerController);
router.post("/loggedin", loginController);
// router.get("/users", registerController);


module.exports = router;