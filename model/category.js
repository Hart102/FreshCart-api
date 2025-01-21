const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  
}, {
  timestamps: true,
});

const category = mongoose.model('categories', categorySchema);
module.exports = { category } 