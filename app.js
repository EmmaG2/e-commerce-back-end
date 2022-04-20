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
app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

app.use(api, productsRouter)
app.use(api, categoriesRouter)

// DB
dbConnection()

// initialize
app.listen(port, () => {
  console.log(`Port: ${port}`)
})