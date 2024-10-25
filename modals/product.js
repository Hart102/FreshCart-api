const mongoose = require("mongoose");
const joi = require("joi")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: String,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['available', 'out of stock'],
    default: 'available',
  },
  images: {
    type: [String],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
}, {
  timestamps: true,
});

const product = mongoose.model('products', productSchema);

const validateProduct = (product) => {
  const schema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    quantity: joi.number().required(),
    status: joi.string().require(),
    user_id: joi.string().required(),
    category_id: joi.string().required(),
  });
  return schema.validate(product);
}

module.exports = { product, validateProduct };
