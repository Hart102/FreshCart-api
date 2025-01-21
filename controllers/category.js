const mongoose = require("mongoose")
const categorySchema = require("../model/category")


const createCategory = async (req, res) => {
    try {
        const { name, status } = req.body
        const category = new categorySchema.category({
            name,
            status
        })
        if (req.user.user_role !== "admin") {
            return res.json({ isError: false, message: "Access denied!, you're not authorized to perform this action" })
        }

        await category.save()
        if (category) {
            res.json({ isError: false, message: "Category created successfully", payload: category })
        }
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}

const editCategory = async (req, res) => {
    try {
        if (req.user.user_role !== "admin") {
            return res.json({ isError: false, message: "Access denied!, you're not authorized to perform this action" })
        }

        const { id } = req.params
        const { name, status } = req.body

        const category = await categorySchema.category.findOneAndUpdate(
            new mongoose.Types.ObjectId(id),
            { name, status }, { new: true }
        )

        if (category) {
            res.json({ isError: false, message: "Category updated successfully", payload: category })
        }
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}

const deleteCategory = async (req, res) => {
    try {
        if (req.user.user_role !== "admin") {
            return res.json({ isError: false, message: "Access denied!, you're not authorized to perform this action" })
        }

        const { id } = req.params
        const category = await categorySchema.category.findOneAndDelete(
            new mongoose.Types.ObjectId(id)
        )

        if (category) {
            res.json({ isError: false, message: "Category deleted successfully" })
        }
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const result = await categorySchema.category.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'category_id',
                    as: 'categories',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    status: 1,
                    product_count: { $size: '$categories' },
                },
            },
        ]);
        res.json({ isError: false, message: '', payload: result });

    } catch (error) {
        res.status(500).json({ isError: true, message: error.message });
    }

}

module.exports = { createCategory, editCategory, deleteCategory, getAllCategories }