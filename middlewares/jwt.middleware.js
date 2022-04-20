const expressJwt = require('express-jwt')

const authJwt = () => {
  try {
    const secret = process.env.secret
    return expressJwt({
    secret,
    algorithms: ['HS256']
  }).unless({
    path: [
      '/api/v1/users/login'
    ]
  })} catch(e) {
    console.log(e)
    res.status(401).send({ error: 'Error de client' })
  }
}

module.exports = authJwt;