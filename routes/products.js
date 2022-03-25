const { Router } = require('express')
require('dotenv/config')

const router = Router()

router.get(`/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hair dresser',
    image: 'some_url'
  }

  res.send(product)
})

router.post(`/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct)
  res.send(newProduct)
})

module.exports = router