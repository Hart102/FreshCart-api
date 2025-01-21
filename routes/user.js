const express = require("express")
const router = express.Router()
const User = require("../controllers/user")
const Jwt = require("../config/jwt")

router.put("/register", User.userRegistration)
router.post("/login", User.userLogin)
router.post("/logout", User.userLogout)
router.patch("/update-profile", Jwt, User.updateProfile)
router.get("/get-profile", Jwt, User.getUserProfile)
router.put("/create-address", Jwt, User.createAddress)
router.delete("/delete-address/:id", Jwt, User.deleteAddress)


module.exports = router
