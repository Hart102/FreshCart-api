const mongoose = require("mongoose")
const productSchema = require("../model/product")
const cartSchema = require("../model/cart")

const getTotalItemsInCart = async (userId) => {
    const totalItemsInCart = await cartSchema.cart.findOne({ user_id: new mongoose.Types.ObjectId(userId) })
    return totalItemsInCart.products.length
}

const addtoCart = async (req, res) => {
    try {
        if (!req.user._id == null || req.user._id == undefined || req.user._id == "") {
            res.json({ isError: "false", message: "Please login and try again!" })
        }

        const { product_id, quantity } = req.body

        const product = await productSchema.product.findById({ _id: new mongoose.Types.ObjectId(product_id) })

        if (product == null) {
            return res.status(404).json({ isError: true, message: "Product not found" })
        }
        const itemInCart = await cartSchema.cart.findOne({
            user_id: new mongoose.Types.ObjectId(req.user._id),
            'products.productId': new mongoose.Types.ObjectId(product_id)
        })

        if (itemInCart == null) {
            const createNewCartItem = new cartSchema.cart({
                user_id: new mongoose.Types.ObjectId(req.user._id),
                products: [{
                    productId: new mongoose.Types.ObjectId(product_id),
                    demanded_quantity: Number(quantity)
                }]
            });
            await createNewCartItem.save();
            const total_items = await getTotalItemsInCart(req.user._id)
            res.json({ isError: false, message: "New item added to cart", total_items });
        } else {

            const updatedCartItem = await cartSchema.cart.findOneAndUpdate(
                { user_id: new mongoose.Types.ObjectId(req.user._id), 'products.productId': new mongoose.Types.ObjectId(product_id) },
                { $inc: { 'products.$.demanded_quantity': Number(quantity) } },
                { new: true }
            );
            const total_items = await getTotalItemsInCart(req.user._id)
            res.json({ isError: false, message: "Cart item updated", total_items });
        }

    } catch (error) {
        res.json({ isError: false, message: "Internal server error" })
    }
}

const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params

        if (id) {
            const result = await cartSchema.cart.findOne(
                { user_id: new mongoose.Types.ObjectId(req.user._id) },
            );

            if (result !== null) {
                // delete user cart record completely when there is nothing in cart
                if (result.products.length === 1) {
                    const deleteCart = await cartSchema.cart.deleteOne({ _id: new mongoose.Types.ObjectId(result._id) })
                    if (deleteCart.deletedCount > 0) {
                        res.json({ isError: false, message: "Cart deleted successfully", total_items: 0 })
                    }
                } else {
                    // remove specific cart item when there are multiple items in cart
                    const filteredCartItem = result.products.find((product) => product.productId == id)
                    const index = result.products.indexOf(filteredCartItem)

                    if (index > -1) {
                        result.products.splice(index, 1);
                        const response = await result.save();
                        const total_items = await getTotalItemsInCart(req.user._id)
                        res.json({ isError: false, message: "Cart item removed successfully", total_items })
                    }
                }
            } else {
                res.status(404).json({ isError: true, message: "Cart item not found" })
            }
        }
    } catch (error) {
        res.json({ isError: false, message: "Internal server error" })
    }
}


const getCartItems = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const cartItems = await cartSchema.cart.aggregate([
            { $match: { user_id: userId } },
            { $unwind: '$products' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },
            {
                $project: {
                    productId: '$products.productId',
                    name: '$productDetails.name',
                    price: '$productDetails.price',
                    demanded_quantity: '$products.demanded_quantity',
                    images: `$productDetails.images`,
                }
            }
        ]);

        res.json({ isError: false, message: "", payload: cartItems });

    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}

module.exports = { addtoCart, removeCartItem, getCartItems }
