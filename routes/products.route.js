const mongoose = require('mongoose')

const {product} = require('../models/product.schema')
const {Category} = require('../models/category.schema')
const {Router} = require('express')

require('dotenv/config')

const productsRote = `/products`

const router = Router()

// ! POST
router.post(`${productsRote}`, async (req, res) => {
  const category = await Category.findById(req.body.category)

  if (!category) return res.status(404).send('invalid category')

  const newProduct = new product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    newImage: req.body.newImage,
    countInStock: req.body.countInStock,
    brand: req.body.brand,
    price: req.body.price,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
    category: req.body.category,
  })

  await newProduct.save()
  if (!newProduct)
    return res.status(404).json({
      succes: false,
      message: 'El producto no fue credo correctamente',
    })

  res.send(newProduct)
})

// ? GET
router.get(`${productsRote}`, async (req, res) => {
  let filter = {}

  if (req.query.categories) {
    filter = {category: req.query.categories.split(',')}
  }

  const productList = await product
    .find(filter)
    // .select('-_id')
    .populate('category')

  if (!productList) res.status(500).json({succes: false})

  res.send(productList)
})

router.get(`${productsRote}/:id`, (req, res) => {
  product
    .findById(req.params.id)
    .populate('category')
    .then((prod) => {
      if (!prod)
        return res.status(404).json({
          succes: false,
          messege: 'producto no encontrado',
        })

      return res.status(200).send(prod)
    })
})

router.get(`${productsRote}/get/count`, (req, res) => {
  product.countDocuments().then((productCount) => {
    if (!productCount)
      return res.status(500).json({
        success: false,
        message: 'No items',
      })

    return res.status(200).send({productCount})
  })
})

router.get(`${productsRote}/get/feature/:count`, (req, res) => {
  const count = req.params.count ? req.params.count : 0

  product
    .find({
      isFeatured: true,
    })
    .limit(parseInt(count))
    .then((featuredProd) => {
      if (!featuredProd)
        return res.status(500).json({
          success: false,
          message: 'No items',
        })

      return res.status(200).send({featuredProd})
    })
})

// * PUT

router.put(`${productsRote}/:id`, async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) return res.status(500).send('invalid product id')

  const updateProduct = await product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      newImage: req.body.newImage,
      countInStock: req.body.countInStock,
      brand: req.body.brand,
      price: req.body.price,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      dateCreated: req.body.dateCreated,
      category: req.body.category,
    },
    {new: true}
  )

  if (!updateProduct)
    return res.status(404).json({
      succes: false,
      message: 'No se pudo actualizar la categoria',
    })

  res.send(updateProduct)
})

//TODO: DELETE route
router.delete(`${productsRote}/:id`, (req, res) => {
  product
    .findByIdAndRemove(req.params.id)
    .then((prod) => {
      if (!prod)
        return res.status(404).json({
          success: false,
          message: "product can't be deleted",
        })

      return res.status(200).json({
        succes: true,
        message: 'product has been deleted',
      })
    })
    .catch((err) => {
      return res.status(400).json({
        succes: false,
        err,
      })
    })
})

module.exports = router
