const { User } = require('../models/user.schema');
const { Router } = require('express')

const router = Router()

router.get(`/`, async (req, res) =>{
  const userList = await User.find();

  if(!userList)res.status(500).json({success: false})
  res.send(userList);
})

module.exports = router;