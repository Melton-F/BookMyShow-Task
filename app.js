const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const userRouter = require('./Router/userRouter')
const movieRouter = require('./Router/movieRouter')
const foodRouter = require('./Router/foodRouter')
const cinemaRouter = require('./Router/cinemaHallRouter')


app.use(bodyParser.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/foods', foodRouter)
app.use('/api/v1/cinemas', cinemaRouter)


module.exports = app