/**
 * DEPENDENCIES
 */

require('dotenv').config()
require('./config/db')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')

const app = express();
const PORT = process.env.PORT || 3013;

const Animal = require('./models/Animal.js')








/**
 * MIDDLEWARE
 */

app.use(morgan('dev')) // logs
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method')) // for DELETE PUT HTTP verbs








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

        // console.log(deletedAnimal)
        
        // redirect back to index page
        res.redirect('/animals')

    // try {
    } catch (err) {
        // res.send('Delete Route error')
        res.status(500).send('delete not successful')
    }
})








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
        res.send('Create Route error')
    }
})








// Edit
app.get('/animals/edit/:id', async (req, res) => {
    try {
        // find the animal to edit
        let foundAnimal = await Animal.findById(req.params.id)
        res.render('edit.ejs', { animal: foundAnimal})
    } catch (error) {
        res.send('Edit Route error')
    }
})








// Update
app.put('/animals/:id', async (req, res) => {
    try {
        // handle the checkbox
        if(req.body.extinct === 'on') {
            req.body.extinct = true
        } else {
            req.body.extinct = false
        }

        // find by id and update with the req. body
        let updatedAnimal = await Animal.findByIdAndUpdate(req.params.id,req.body)

        // redirect to the show route with the updated animal
        // res.send(req.body)
        res.redirect(`/animals/${updatedAnimal._id}`)

        // try {
    } catch(error) {
        res.send('Update Route error')
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