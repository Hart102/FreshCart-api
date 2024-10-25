const express = require("express")
const router = express.Router()
const Jwt = require("../config/jwt")
const { FileReader } = require("../config/appWrite")
const product = require("../controllers/products")



/** GET Methods */
/**
 * @openapi
 * '/api/product/':
 *  get:
 *     tags:
 *     - Product Controller
 *     summary: Retrieve all products with category details
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", product.getAllProducts)

/** GET Methods */
/**
 * @openapi
 * '/api/product/{id}':
 *  get:
 *     tags:
 *     - Product Controller
 *     summary: Retrieve a product by ID with category details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", product.getProductById)


/** GET Methods */
/**
 * @openapi
 * '/api/product/category/{categoryName}':
 *  get:
 *     tags:
 *     - Product Controller
 *     summary: Get products by category name
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get("/category/:name", product.getProductsByCategory)

/** POST Methods */
/**
 * @openapi
 * '/api/product/create':
 *  post:
 *     tags:
 *     - Product Controller
 *     summary: Upload product images and create a product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: JPEG, PNG, JPG files
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *               category_id:
 *                 type: string
 *                 default: 67138030e6a8780025a0fc92
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: No image uploaded or invalid image type
 *       500:
 *         description: Internal server error
 */
router.post("/create", Jwt, FileReader, product.createProduct)


/** POST Methods */
/**
 * @openapi
 * '/api/product/edit/{id}':
 *  post:
 *     tags:
 *     - Product Controller
 *     summary: Update a product and optionally replace images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               status:
 *                 type: string
 *               category_id:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               replacedImageIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid image type or other validation error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post("/edit/:id", Jwt, FileReader, product.editProduct)


/** DELETE Methods */
/**
 * @openapi
 * '/api/product/delete/{id}':
 *  delete:
 *     tags:
 *     - Product Controller
 *     summary: Delete a product and its associated images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", product.deleteProduct)


module.exports = router