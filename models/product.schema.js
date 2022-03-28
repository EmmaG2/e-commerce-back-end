const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  richDescription: {
    type: String,
    default: 'Empy string'
  },
  newImage: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
  },
})

exports.product = mongoose.model('Product', productSchema);

