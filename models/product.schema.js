const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: String,
  newImage: String,
  countInStock: {
    type: Number,
    required: true,
  },
})

exports.product = mongoose.model('Product', productSchema);

