/**
 * DEPENDENCIES
 */

require('dotenv').config()
require('./config/db')
const express = require('express')
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT || 3013;

const Animal = require('./models/Animal.js')

/**
 * MIDDLEWARE
 */

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))







/**
 * ROUTES - INDUCES
 */



// Index



// New



// Create
app.post('/animals', async (req, res) => {
    // res.send('received')
    try {
        let newAnimal = await Animal.create(req.body)
        res.send(newAnimal)

        // try {
    } catch (err) {
        res.send(err)
    }
})



// Show - always last








/**
 * SERVER LISTENER
 */

app.listen(PORT, () => console.log(`Listening on ${PORT}`))