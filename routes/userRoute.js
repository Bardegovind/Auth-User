const express = require("express");
const router = express.Router();
const {Signup ,Login , updateUser , deleteUser , allUsers} = require("../routeController/userController");
const validationSignup = require("../middelwares/validatedSignup");
const authProtecter = require("../middelwares/authMiddlewaare");

router.get("/", authProtecter,allUsers);
router.post("/signup",validationSignup,Signup);
router.post("/login" ,Login);
router.patch("/update/:id",authProtecter,updateUser);
router.delete("/delete/:id",authProtecter,deleteUser);

module.exports = router;


