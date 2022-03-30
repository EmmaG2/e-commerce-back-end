const { Order } = require('../models/order.schema');
const { Router } = require('express')

const router = Router()

router.get(`/`, async (req, res) =>{
  const orderList = await Order.find()

  if(!orderList) res.status(500).json({success: false})
  res.send(orderList)
})

module.exports = router