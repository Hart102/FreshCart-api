require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const userSchema = require("../modals/user")
const salt = 10

const userRegistration = async (req, res) => {
    try {
        const {error, value} = userSchema.validateRegistrationForm(req.body)
        if(error){
            return res.json({isError: true, message: error.details[0].message.replace(/"/g, "")})
        }
        const hashedPassword = await bcrypt.hash(value.password, salt)

        const user = new userSchema.User({
            firstname: value.firstname.toLowerCase().trim(),
            lastname: value.lastname.toLowerCase().trim(),
            email: value.email,
            password: hashedPassword
        })

        await user.save()
        res.json({ isError: false, message: "User Registration Successful!", payload: user})

    } catch (error) {
        res.json({isError: true, message: "Internal server error"})
    }
}

const userLogin = async (req, res) => {
    try {
        const {error, value} = userSchema.validateLoginForm(req.body)
        if(error){
            return res.json({isError: true, message: error.details[0].message.replace(/"/g, "")})
        }
        const user = await userSchema.User.findOne({email: value.email})

        if(!user){
            return res.json({ isError: true, message: "User not found!"})
        }
        const isMatch = await bcrypt.compare(value.password, user.password)

        if(!isMatch){
            return res.json({ isError: true, message: "Incorrect email or password!"})
        }

        const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN, {expiresIn: "24h"})
        req.user = token
        res.json({ isError: false, message: "Login Successful!", user_role: user.user_role, payload: token })

    } catch (error) {
        res.json({isError: true, message: "Internal server error"})
    }
}


const  userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ isError: false, message: "Successful" })
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })  
    }
}


const updateProfile = async(req, res) => {
    try {
        const {error, value} = userSchema.validateUpdateForm(req.body)
        if(error){
            return res.json({ isError: true, message: error.details[0].message.replace(/"/g, "")})
        }

        const emailInUseByAnotherUser = await userSchema.User.findOne({ 
            email: value.email,
            _id: { $ne: new mongoose.Types.ObjectId(req.user._id) } 
        });
        
        if (emailInUseByAnotherUser) {
            return res.json({ isError: true, message: 'Email already in use!' });
        }

        const user = await userSchema.User.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(req.user._id), 
        },
        {
            firstname: value.firstname.toLowerCase().trim(),
            lastname: value.lastname.toLowerCase().trim(),
            email: value.email,
        })
        res.json({ isError: false, message: "Profile updated successfully!", payload: user})
    } catch (error) {
        res.json({isError: true, message: error.message})
    }
}

const getUserProfile = async (req, res) => {
    try {
        if(req.user){
            const user = await userSchema.User.findById(req.user._id)
            if(!user){
                return res.json({ isError: true, message: "User not found!"})
            }
            res.json({ isError: false, message: "", payload: user})
        }
    } catch (error) {
        res.json({isError: true, message: "Internal server error"})
    }
}

const createAddress = async (req, res) => {
    try {
        const {error, value} = userSchema.validateAddressForm(req.body)
        if(error){
            return res.json({ isError: true, message: error.details[0].message.replace(/"/g, "")})
        }
        const response = await userSchema.User.findById(req.user._id);

        if (!response) {
            return res.json({ isError: true, message: "User not found!" });
        }

        if (response.addresses.length == 2) {
            return res.json({ isError: true, message: "You cannot add more than two addresses." });
        }
        const user = await userSchema.User.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.user._id) },
            { $push: { addresses: value } },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ isError: true, message: "User not found!" });
        }

        res.json({ isError: false, message: "Address added successfully!", payload: user.addresses })
    } catch (error) {
        res.json({isError: true, message: "Internal server error"})
    }
}

const deleteAddress = async (req, res) => {
    try {
        const address_id = req.params.id
        if(address_id){
            const result = await userSchema.User.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { addresses: { _id: address_id } } },
                { new: true }
            );

            if (!result) {
                return res.status(404).json({ isError: true, message: "Address not found!" });
            }
            
            res.json({ isError: false, message: "Address deleted", payload: result.addresses })
        }
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}

module.exports = {
    userRegistration,
    userLogin,
    userLogout,
    updateProfile,
    getUserProfile,
    createAddress,
    deleteAddress
}



