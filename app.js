const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const DEBUG = process.env.DEBUG
const app = new express()

app.use(morgan('short'))
app.use(helmet())

const getUserStatsController = require('./controllers/get-user-stats-controller')

app.get('/', getUserStatsController)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    let message = DEBUG ? 'Starting development server on port' : 'App listening on port'
    console.log(message, `${PORT}`)
})
