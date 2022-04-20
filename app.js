// express
require('dotenv/config')

const { dbConnection } = require('./database/dbConnection')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const port = process.env.PORT
const api = process.env.API_URL

// Routes 
const productsRouter = require('./routes/products.route')
const categoriesRouter = require('./routes/categories.route')
const usersRouter = require('./routes/users.route')
const authJwt = require('./middlewares/jwt.middleware')
const handlingErrors = require('./middlewares/error.middleware')

app.use(cors())
app.options('*', cors())

// middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(handlingErrors)

// routes
app.use(api, productsRouter)
app.use(api, categoriesRouter)
app.use(api, usersRouter)

// DB
dbConnection()

// initialize
app.listen(port, () => {
  console.log(`Port: ${port}`)
})