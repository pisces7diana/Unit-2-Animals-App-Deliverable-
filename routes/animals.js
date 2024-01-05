/**
 * DEPENDENCIES
 */

const express = require('express')
const router = express.Router() // create a Router to place inside our server to then access all of these routes programmatically





/**
 * Routes INDUCESS because of Seed
 */

// change all app. to router and remove 'animals but keep /'
// change await Animal. to await req.model.Animal.








// Index
router.get('/', async (req, res) => {
    // find all of the animals
    // let animals = await Animal.find({})
    let animals = await req.model.Animal.find({})

    // render all of the animals to index.ejs
    res.render('index.ejs', {animals: animals.reverse() })
})








// New
router.get('/new', (req, res) => {
    // res.send('new animal')
    res.render('new.ejs')
})








// Delete
router.delete('/:id', async (req, res) => {
    try {
        // find animal and then delete
        let deletedAnimal = await req.model.Animal.findByIdAndDelete(req.params.id)

        // console.log(deletedAnimal)
        
        // redirect back to index page
        res.redirect('/animals')

    // try {
    } catch (err) {
        // res.send('Delete Route error')
        res.status(500).send('delete not successful')
    }
})








// Create - POST
router.post('/', async (req, res) => {
    // res.send('received') - testing in Thunderclient
    try {
        if (req.body.extinct === 'on') {
            // if checked
            req.body.extinct = true
    } else {
            // if not checked
            req.body.extinct = false
    }
        let newAnimal = await req.model.Animal.create(req.body)
        // res.send(newAnimal)
        res.redirect('/animals')

        // try {
    } catch (err) {
        res.send('Create Route error')
    }
})








// Edit
router.get('/edit/:id', async (req, res) => {
    try {
        // find the animal to edit
        let foundAnimal = await req.model.Animal.findById(req.params.id)
        res.render('edit.ejs', { animal: foundAnimal})
    } catch (error) {
        res.send('Edit Route error')
    }
})








// Update
router.put('/:id', async (req, res) => {
    try {
        // handle the checkbox
        if(req.body.extinct === 'on') {
            req.body.extinct = true
        } else {
            req.body.extinct = false
        }

        // find by id and update with the req. body
        let updatedAnimal = await req.model.Animal.findByIdAndUpdate(req.params.id,req.body)

        // redirect to the show route with the updated animal
        // res.send(req.body)
        res.redirect(`/animals/${updatedAnimal._id}`)

        // try {
    } catch(error) {
        res.send('Update Route error')
    }
})







// Seed
router.get('/seed', async (req, res) => {
    try {
        // delete all animals in the db
        await req.model.Animal.deleteMany({})

        // create starter Animals in db
        await req.model.Animal.create(
            // [
            //     { species: "Cat", extinct: "false", location: "Salem, NC", lifeExpectancy: "9" },
            //     { species: "Monkey", extinct: "true", location: "San Diego, CA", lifeExpectancy: "100" },
            //     { species: "Elephant", extinct: "true", location: "Africa", lifeExpectancy: "99" },
            //     { species: "Fish", extinct: "false", location: "Denver, CO", lifeExpectancy: "38"},
            //     { species: "Vizsla", extinct: "false", location: "Chula Vista", lifeExpectancy: "7" },
            // ]
            // seedAnimal
            req.model.seedAnimal
        )

        // redirect back to the index
        res.redirect('/animals')

    } catch (error) {
        res.send('Seed Route error')
    }
});








// Show - always last
router.get('/:id', async (req, res) => {
    // find an animal by _id
    let foundAnimal = await req.model.Animal.findById(req.params.id)

    // console.log(foundAnimal)

    // render show.ejs with the foundAnimal
    res.render('show.ejs', { animal: foundAnimal })
})







// Export router
module.exports = router