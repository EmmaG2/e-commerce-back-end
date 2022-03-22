const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')

const app = express()
const port = process.env.PORT
const api = process.env.API_URL

app.use(express.json())
app.use(morgan('tiny'))

app.use(api, require('./routes/products'))

mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('Db Connection is ready');
  })
  .catch((e) => {
    console.log(e);
  })

app.listen(port, () => {
  console.log(`https://localhost:${port}`)
})