const {User} = require('../models/user.schema')
const {Router} = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = Router()

// TODO: POST Methods
router.post(`/users`, (req, res) => {
  const user = new User({
    userName: req.body.userName,
    realName: req.body.realName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    estado: req.body.estado,
    municipio: req.body.municipio,
    colonia: req.body.colonia,
    numExterior: req.body.numExterior,
    numeInterior: req.body.numeInterior,
    calle: req.body.calle,
    ciudad: req.body.ciudad,
    cp: req.body.cp,
    country: req.body.country,
  })

  user.save()
  res.send(user)
})

router.post(`/users/login`, async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  const secret = process.env.secret

  if (!user) return res.status(400).send('User Not Found')

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret
    )
    return res.status(200).send({user: user.email, token})
  } else {
    res.status(400).send('password is wrong')
  }
})

router.post(`/users/register`, async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    realName: req.body.realName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    estado: req.body.estado,
    municipio: req.body.municipio,
    colonia: req.body.colonia,
    numExterior: req.body.numExterior,
    numeInterior: req.body.numeInterior,
    calle: req.body.calle,
    ciudad: req.body.ciudad,
    cp: req.body.cp,
    country: req.body.country,
  })

  user.save()
  res.status(200).json({
    message: 'succesful regist',
    user,
  })
})

// TODO: GET Methods
router.get(`/users`, (req, res) => {
  User.find()
    .select('userName realName phone email')
    .then((user) => {
      if (!user)
        return res.status(404).json({
          succes: false,
          message: 'no se encontró el usuario',
        })

      return res.status(200).send(user)
    })
})

router.get(`/users/:id`, async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user)
    res.status(404).json({
      succes: false,
      message: 'El usuario no fue encontrado',
    })

  res.status(200).send(user)
})

router.get(`/users/get/count`, (req, res) => {
  User.countDocuments().then((usersCount) => {
    if (!usersCount)
      return res.status(500).json({
        succes: false,
        message: 'No se encontraron usuarios',
      })

    return res.status(200).send({usersCount})
  })
})

// TODO: PUT METHODS
router.put(`/users/:id`, async (req, res) => {
  const userExist = await User.findById(req.params.id)

  let newPassword

  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10)
  } else newPassword = userExist.password
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      userName: req.body.userName,
      realName: req.body.realName,
      email: req.body.email,
      password: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      estado: req.body.estado,
      municipio: req.body.municipio,
      colonia: req.body.colonia,
      numExterior: req.body.numExterior,
      numeInterior: req.body.numeInterior,
      calle: req.body.calle,
      ciudad: req.body.ciudad,
      cp: req.body.cp,
      country: req.body.country,
    },
    {
      new: true,
    }
  )

  if (!user)
    return res.status(404).json({
      succes: false,
      message: 'No se pudo actualizar la categoria',
    })

  res.send(user)
})

// TODO: DELETE routes

router.delete(`/users/:id`, (req, res) => {
  User.findByIdAndDelete(req.params.id).then((user) => {
    if (!user)
      return res.status(404).json({
        succes: false,
        message: "user can't be deleted",
      })

    return res.status(200).json({
      succes: true,
      message: 'User has been deleted',
    })
  })
})

module.exports = router
