const express = require("express")
const router = express.Router()
const category = require("../controllers/category")
const Jwt = require("../config/jwt")

router.get("/", category.getAllCategories)
router.post("/create", Jwt, category.createCategory)
router.post("/edit/:id", Jwt,  category.editCategory)
router.delete("/delete/:id", Jwt, category.deleteCategory)

module.exports = router