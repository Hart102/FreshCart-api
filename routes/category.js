const express = require("express")
const router = express.Router()
const category = require("../controllers/category")


/** GET Methods */
/**
 * @openapi
 * '/api/category':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get all categories with product count
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get("/", category.getAllCategories)


/** POST Methods */
/**
 * @openapi
 * '/api/category/create':
 *  post:
 *     tags:
 *     - Category Controller
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", category.createCategory)


/** POST Methods */
/**
 * @openapi
 * '/api/category/edit/{id}':
 *  post:
 *     tags:
 *     - Category Controller
 *     summary: Update an existing category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       500:
 *         description: Internal server error
 */
router.post("/edit/:id", category.editCategory)


/** DELETE Methods */
/**
 * @openapi
 * '/api/category/{id}':
 *  delete:
 *     tags:
 *     - Category Controller
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", category.deleteCategory)

module.exports = router