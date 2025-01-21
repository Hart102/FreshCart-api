const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
        },
        demanded_quantity: {
            type: Number,
            required: true,
        },
    }],
    // total_amount: {
    //     type: String,
    //     required: true,
    // },
})

const cart = mongoose.model('carts', cartSchema)
module.exports = { cart }