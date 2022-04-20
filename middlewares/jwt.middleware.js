const expressJwt = require('express-jwt')

const authJwt = () => {
  try {
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt({
    secret,
    algorithms: ['HS256']
  }).unless({
    path: [
      {
        url: `${api}/products`,
        methods: ['GET', 'OPTIONS']
      },
      `${api}/users/login`,
      `${api}/users/register`,
    ]
  })} catch(e) {
    console.log(e)
    res.status(401).send({ error: 'Error de client' })
  }
}

module.exports = authJwt;