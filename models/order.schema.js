const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  shippingAdress1: {
    type: String,
    required: true,
  },
  shippingAdress2: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  municipio: {
    type: String,
    required: true,
  },
  colonia: {
    type: String,
    required: true,
  },
  numExterior: {
    type: String,
    required: true,
  },
  numeInterior: {
    type: String,
    required: false,
  },
  calle: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  cp: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
})

orderSchema.virtual('id').get(function () {
  return this._id
})

orderSchema.set('jtoJSON', {
  virtuals: true,
})

exports.Order = mongoose.model('Order', orderSchema)
