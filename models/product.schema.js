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
  images: [{
    type: String
  }],
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 500
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

exports.product = mongoose.model('Product', productSchema);

