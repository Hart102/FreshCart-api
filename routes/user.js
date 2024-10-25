const express = require("express")
const router = express.Router()
const User = require("../controllers/user")
const Jwt = require("../config/jwt")


/** PUT Methods */
/**
 * @openapi
 * '/api/user/register':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *            properties:
 *              firstname:
 *                type: string
 *                default: tim
 *              lastname:
 *                type: string
 *                defualt: jerry
 *              email:
 *                type: string
 *                default: tim@mail.com
 *              password:
 *                type: string
 *                default: 123456
 *     responses:
 *      400:
 *        description: Field Missing
 *      200:
 *        description: Successful
 *      500:
 *        description: Server Error
 */
router.put("/register", User.userRegistration)


/** POST Methods */
/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: tim@mail.com
 *              password:
 *                type: string
 *                default: 123456
 *     responses:
 *      400:
 *        description: Not found
 *      500:
 *        description: Server Error
 */
router.post("/login", User.userLogin)

/** POST Methods */
/**
 * @openapi
 * '/api/user/logout':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: User Logout
 *     requestBody:
 *      required: false
 *      200:
 *        description: Successful
 *      500:
 *        description: Server Error
 */
router.post("/logout", User.userLogout)

/** PATCH Method */
/**
 * @openapi
 * '/api/user/update-profile':
 *  patch:
 *     tags:
 *     - User Controller
 *     summary: Update User Profile
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - firstname
 *              - lastname
 *              - email
 *            properties:
 *              firstname:
 *                type: string
 *                example: "tim updated"
 *              lastname:
 *                type: string
 *                example: "jerry"
 *              email:
 *                type: string
 *                example: "timupdated@mail.com"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isError:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully!"
 *                 payload:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64fa2db48b2ab25f943e3c12"
 *                     firstname:
 *                       type: string
 *                       example: "tim"
 *                     lastname:
 *                       type: string
 *                       example: "jerry"
 *                     email:
 *                       type: string
 *                       example: "timupdated@mail.com"
 *       400:
 *         description: Validation error or email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isError:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Email already in use!"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isError:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Server error message"
 */
router.patch("/update-profile", Jwt, User.updateProfile)


/** GET Methods */
/**
 * @openapi
 * '/api/user/get-profile':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get User Profile
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *     responses:
 *      400:
 *        description: Not found
 *      500:
 *        description: Server Error
 */
router.get("/get-profile", Jwt, User.getUserProfile)


/** PUT Methods */
/**
 * @openapi
 * '/api/user/create-address':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Create address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address_line
 *               - city
 *               - state
 *               - country
 *               - phone
 *             properties:
 *               address_line:
 *                 type: string
 *                 example: Gate 6 Mouau
 *               city:
 *                 type: string
 *                 example: Umuahia
 *               state:
 *                 type: string
 *                 example: Abia state
 *               country:
 *                 type: string
 *                 example: Nigeria
 *               phone:
 *                 type: string
 *                 example: 09012345678
 *     responses:
 *       200:
 *         description: Address added successfully
 *       400:
 *         description: Invalid input or address limit reached
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


/** PUT Methods */
/**
 * @openapi
 * '/api/user/create-address':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Create User address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address_line
 *               - city
 *               - state
 *               - country
 *               - phone
 *             properties:
 *               address_line:
 *                 type: string
 *                 example: Gate 6 Mouau
 *               city:
 *                 type: string
 *                 example: Umuahia
 *               state:
 *                 type: string
 *                 example: Abia state
 *               country:
 *                 type: string
 *                 example: Nigeria
 *               phone:
 *                 type: string
 *                 example: 09012345678
 *     responses:
 *       200:
 *         description: Address added successfully
 *       400:
 *         description: Invalid input or address limit reached
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/create-address", Jwt, User.createAddress)


/** DELETE Methods */
/**
 * @openapi
 * '/api/user/delete-address/{id}':
 *  delete:
 *     tags:
 *     - User Controller
 *     summary: Delete a user's address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address deleted
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete-address/:id", Jwt, User.deleteAddress)


module.exports = router
