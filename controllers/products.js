require("dotenv").config()
const mongoose = require("mongoose")
const productSchema = require("../modals/product")
const { FileUploader, storage } = require("../config/appWrite")
const  categorySchema = require("../modals/category")


const createProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.json({ isError: true, message: "No image uploaded!" });
        }
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        for (const file of req.files) {
            if (!allowedImageTypes.includes(file.mimetype)) {
                return res.json({ isError: true, message: "Invalid image type! Only JPEG, PNG, and JPG are allowed." });
            }
        }
        const uploadedFiles = await FileUploader(req.files)

        if (uploadedFiles.length > 0) {
            const {name, price, description, quantity, status, category_id} = req.body
            const product = new productSchema.product({
                name,
                price: `NGN ${price}`,
                description,
                quantity,
                status,
                images: uploadedFiles,
                user_id: req.user._id,
                category_id
            })
            await product.save()
            if(product){
                res.json({ isError: false, message: "Product created successfully", payload: product })
            }
        }
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}


const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, description, quantity, status, category_id } = req.body

        // update product with images
        if(req.files.length > 0){
            const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            for (const file of req.files) {
                if (!allowedImageTypes.includes(file.mimetype)) {
                    return res.json({ isError: true, message: "Invalid image type! Only JPEG, PNG, and JPG are allowed." });
                }
            }

            const images = JSON.parse(req.body.images)
            const replacedImageIds = JSON.parse(req.body.replacedImageIds)

            let deleteCount = 0
            for(const fileId of replacedImageIds){
                //Delete old files
                await storage.deleteFile(process.env.APPWRITE_BUCKET_ID, fileId);
                deleteCount++

                //upload and replace old images
                if(deleteCount == replacedImageIds.length){
                    const uploadedFiles = await FileUploader(req.files)

                    const replaceOldImages = () => {
                        for(let index = 0; index < images.length; index++){
                            if(images.includes(replacedImageIds[index])){
                                images[images.indexOf(replacedImageIds[index])] = uploadedFiles[index]
                            }
                        }
                        return images
                    }
                    if(replaceOldImages()){
                        const product = await productSchema.product.findOneAndUpdate(new mongoose.Types.ObjectId(id),
                        {
                            name,
                            price: `NGN${price}`,
                            description,
                            quantity,
                            status,
                            images: replaceOldImages(),
                            category_id: new mongoose.Types.ObjectId(category_id)
                        }, { new: true })

                        if(product){
                            res.json({ isError: false, message: "Product updated successfully", payload: product })
                        }
                    }
                }
            }
        }else{
            //update product without images
            const product = await productSchema.product.findOneAndUpdate(new mongoose.Types.ObjectId(id),
            {
                name,
                price: `NGN${price}`,
                description,
                quantity,
                status,
                category_id: new mongoose.Types.ObjectId(category_id)
            }, { new: true })

            if(product){
                res.json({ isError: false, message: "Product updated successfully", payload: product })
            }
        }
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}


const getAllProducts = async (req, res) => {
    try {
        const result = await productSchema.product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "products"
                },                   
            },
            {
                $unwind: "$products"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    description: 1,
                    quantity: 1,
                    status: 1,
                    images: 1,
                    category_id: 1,
                    category_name: "$products.name"
                }
            },
            { $sort: { createdAt: -1 } }
        ])
        if(result){
            res.json({ isError: false, message: "Products fetched successfully", payload: result })
        }
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        const result = await productSchema.product.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "products"
                },                   
            },
            {
                $unwind: "$products"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    description: 1,
                    quantity: 1,
                    status: 1,
                    images: 1,
                    category_id: 1,
                    category_name: "$products.name"
                }
            },
            { $sort: { createdAt: -1 } }
        ])

        if (result) {
            res.json({ isError: false, message: "", payload: result[0] })

        }else{
            res.json({ isError: false, message: "Product not found!", payload: {} })
        }
        
    } catch (error) {
        res.json({ isError: true, message: "Internal server error" })
    }
}

const getProductsByCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await categorySchema.category.findOne({ name: name });

    if (category) {
      const result = await productSchema.product.aggregate([
        {
          $match: { category_id: category._id },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'categoryDetails',
          },
        },
        {
          $unwind: '$categoryDetails',
        },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            description: 1,
            quantity: 1,
            status: 1,
            images: 1,
            category_id: 1,
            category_name: '$categoryDetails.name',
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      res.json({ isError: false, message: '', payload: result });
    } else {
      res.json({ isError: true, message: 'No category found with the specified name' });
    }
  } catch (error) {
    res.json({ isError: true, message: 'Internal server error' });
  }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        // Delete all images associated with the product
        const product = await productSchema.product.findById(new mongoose.Types.ObjectId(id))
        if(!product){
            return res.json({ isError: true, message: "Product not found" })
        }

        let deleteCount = 0
        const files = product.images
        for(const fileId of files){
            deleteCount++
            await storage.deleteFile(process.env.APPWRITE_BUCKET_ID, fileId);
        }

        // Delete the product itself
        if(deleteCount == files.length){
            const result = await productSchema.product.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    
            if(result){
                res.json({ isError: false, message: "Product deleted successfully" })
            } else {
                res.json({ isError: true, message: "Product not found" })
            }
        }
    } catch (error) {
        console.log(error.message)
        res.json({ isError: true, message: "Internal server error" })
    }
}

module.exports = {
    createProduct,
    editProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    deleteProduct
}


