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
app.get('/animals', async (req, res) => {
    // find all of the animals
    let animals = await Animal.find({})

    // render all of the animals to index.ejs
    res.render('index.ejs', {animals: animals.reverse() })
})



// New
app.get('/animals/new', (req, res) => {
    // res.send('new animal')
    res.render('new.ejs')
})

// Delete
app.delete('/animals/:id', async (req, res) => {
    try {
        // find animal and then delete
        let deletedAnimal = await Animal.findByIdAndDelete(req.params.id)

        console.log(deletedAnimal)
        
        // redirect back to index page
        res.redirect('/animals')

    // try {
    } catch (err) {
        // res.send(err)
        res.status(500).send('delete not successful')    }
})





// Update






// Edit






// Create
app.post('/animals', async (req, res) => {
    // res.send('received')
    try {
        if (req.body.extinct === 'on') {
            // if checked
            req.body.extinct = true
    } else {
            // if not checked
            req.body.extinct = false
    }
        let newAnimal = await Animal.create(req.body)
        // res.send(newAnimal)
        res.redirect('/animals')

        // try {
    } catch (err) {
        res.send(err)
    }
})



// Show - always last
app.get('/animals/:id', async (req, res) => {
    // find an animal by _id
    let foundAnimal = await Animal.findById(req.params.id)

    // console.log(foundAnimal)

    // render show.ejs with the foundAnimal
    res.render('show.ejs', { animal: foundAnimal })
})








/**
 * SERVER LISTENER
 */

app.listen(PORT, () => console.log(`Listening on ${PORT}`))