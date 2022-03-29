const { Category } = require('../models/category.schema');
const { Router } = require('express');

const router = Router()

// ! GET 
router.get(`/categories`, async (req, res) => {
  Category.find()
    .then(cat => {
      if (!cat) return res.status(404).json({
        succes: false,
        mesege: 'categoria no encontrada'
      })

      return res.status(200).send(cat)
    })
})

router.get(`/categories/:id`, async (req, res) => {

  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(404).json({
      succes: false,
      message: 'la categoria no fue encontrada'
    })
  }

  res.status(200).send(category)
})

// * POST
router.post(`/categories`, (req, res) => {
    const category = new Category({
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon
    })
  
    category.save()
    res.send(category)
  })

// TODO: Hacer las peticiones PUT

router.put(`/categories/:id`, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon
    },
    {
      new: true
    }
  )

    if (!category) return res.status(404).json({
      succes: false,
      message: 'No se pudo actualizar la categoria'
    })

    res.send(category)
})

//? DELETE 
router.delete(`/categories/:id`, (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then(cat =>{
      if (!cat) return res.status(404).json({
        success: false,
        message: 'category can\'t be deleted'
      })
      
      return res.status(200).json({
        succes: true,
        message: 'category has been deleted'
      })
    })
    .catch(err => {
      return res.status(400).json({
        succes: false,
        err
      })
    })
})

module.exports = router;