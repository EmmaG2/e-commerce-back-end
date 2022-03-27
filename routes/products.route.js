const { product } = require('../models/product.schema')
const { Router } = require('express')
require('dotenv/config')


const router = Router()

router.get(`/products`, async (req, res) => {
  
  const productList = await product.find()

  if (!productList) res.status(500).json({"succes": false})

  res.send(productList)
})

router.post(`/products`, (req, res) => {
  const newProduct = new product({
    name: req.body.name,
    newImage: req.body.newImage,
    countInStock: req.body.countInStock
  })

  newProduct.save()
  res.send(newProduct)
})

module.exports = router