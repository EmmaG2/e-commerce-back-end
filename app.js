// express
require('dotenv/config')

const { dbConnection } = require('./database/dbConnection')
const express = require('express')
const morgan = require('morgan')


const app = express()
const port = process.env.PORT
const api = process.env.API_URL
const productsRouter = require('./routes/products.route')

app.use(express.json())
app.use(morgan('tiny'))

// Routes
app.use(api, productsRouter)

// DB
dbConnection()

// initialize
app.listen(port, () => {
  console.log(`Port: ${port}`)
})