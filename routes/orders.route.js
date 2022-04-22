const {Order} = require('../models/order.schema')
const {Router} = require('express')
const {OrderItem} = require('../models/order-item.schema')

const router = Router()

router.get(`/`, async (req, res) => {
  const orderList = await Order.find()

  if (!orderList) res.status(500).json({success: false})
  res.send(orderList)
})

router.post(`/orders`, (req, res) => {
  const orderItemsIds = req.body.orderItems.map((orderItem) => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product,
    })

    newOrderItem.save()

    return newOrderItem._id
  })

  const order = new Order({
    orderItems: orderItemsIds,
    shippingAdress1: req.body.shippingAdress1,
    shippingAdress2: req.body.shippingAdress2,
    estado: req.body.estado,
    municipio: req.body.municipio,
    colonia: req.body.colonia,
    numExterior: req.body.numExterior,
    numInterior: req.body.numInterior,
    calle: req.body.calle,
    ciudad: req.body.ciudad,
    cp: req.body.cp,
    country: req.body.country,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
    phone: req.body.phone,
    status: req.body.status,
  })

  order.save()
  res.send(order)
})
module.exports = router
