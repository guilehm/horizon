const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')

const DEBUG = process.env.DEBUG
const app = new express()

const env = process.env.NODE_ENV || 'development'
const mongoConfig = require('./config/mongo')[env]
const envUrl = process.env[mongoConfig.use_env_variable]
const DevUrl = `mongodb://${mongoConfig.host}/${mongoConfig.database}`
const mongoUrl = envUrl ? envUrl : DevUrl

mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(e => console.log('Something went wrong', e))


app.use(morgan('short'))
app.use(helmet())

const getUserStatsController = require('./controllers/get-user-stats-controller')
const getUserStatsOverallController = require('./controllers/get-user-stats-overall-controller')

app.get('/', getUserStatsController)
app.get('/overall/', getUserStatsOverallController)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    let message = DEBUG ? 'Starting development server on port' : 'App listening on port'
    console.log(message, `${PORT}`)
})
