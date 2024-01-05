/**
 * DEPENDENCIES
 * if I don't want to use middleware, remove req.model. in front of Animal
 * and use const Animal = require('../models/Animal.js')
 */




/**
 * EXPORTS
 */

module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    seed,
    show
}




/**
 * Route Controllers
 */




async function index(req, res) {
    // find all of the animals
    let animals = await req.model.Animal.find({})

    // render all of the animals to index.ejs
    res.render('index.ejs', {animals: animals.reverse() })
}




async function newForm(req, res) {
    // res.send('new animal')
    // render the create form
    res.render('new.ejs')
}




async function destroy(req, res) {
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
}




async function update(req, res) {
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
}




async function create(req, res) {
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
}




async function edit(req, res){
    try {
        // find the animal to edit
        let foundAnimal = await req.model.Animal.findById(req.params.id)
        res.render('edit.ejs', { animal: foundAnimal})
    } catch (error) {
        res.send('Edit Route error')
    }
}




async function seed(req, res){
    try {
        // delete all animals in the db
        await req.model.Animal.deleteMany({})

        // create starter Animals in db
        await req.model.Animal.create(
            // seedAnimal
            req.model.seedAnimal
        )

        // redirect back to the index
        res.redirect('/animals')

    } catch (error) {
        res.send('Seed Route error')
    }
}




async function show(req, res) {
    // find an animal by _id
    let foundAnimal = await req.model.Animal.findById(req.params.id)

    // console.log(foundAnimal)

    // render show.ejs with the foundAnimal
    res.render('show.ejs', { animal: foundAnimal })
}