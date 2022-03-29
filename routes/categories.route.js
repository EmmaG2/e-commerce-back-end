const { Category } = require('../models/category.schema');
const { Router } = require('express')

const router = Router()

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) res.status(500).json({success: false})
    res.send(categoryList);
})

module.exports = router;