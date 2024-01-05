// server is serving up the router
// router is serving up the routes associated with its model
// the model is controlling the actions inside of the routes.
// where I define models is in the models directory, where I can check the shape (primary source of truth of the shape of my data that I'm working with)
// serve up public directory... will serve up css file


/**
 * DEPENDENCIES
 */

require('dotenv').config()
require('./config/db')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const router = require('./routes/animals.js');

const app = express();
const PORT = process.env.PORT || 3013;

const seedAnimal = require('./models/seed.js')
const Animal = require('./models/Animal.js')




/**
 * MIDDLEWARE
 */




app.use((req, res, next) => {
    req.model = {
        Animal,
        seedAnimal
    }
    console.log('this is middlewware')

    // go to the next app method
    next()
})

app.use(morgan('dev')) // logs
app.use(express.urlencoded({extended: true})) // body parser ("breaking down data/interprete it in order to extract meaningful info") this is how we get access to req.body
app.use(methodOverride('_method')) // for DELETE PUT HTTP verbs
app.use('/public', express.static('public')) // serve up our public directory with the url prefix of /public/styles.css, such as localhost:3000/public/styles.css so I can see my css




/**
 * ROUTES  & ROUTER- INDUCES
 */

// copy all routes and paste to routes/animals.js and cut all routes here

app.use('/animals', router)


// // Index
// app.get('/animals', async (req, res) => {
//     // find all of the animals
//     let animals = await Animal.find({})

//     // render all of the animals to index.ejs
//     res.render('index.ejs', {animals: animals.reverse() })
// })




// // New
// app.get('/animals/new', (req, res) => {
//     // res.send('new animal')
//     res.render('new.ejs')
// })




// // Delete
// app.delete('/animals/:id', async (req, res) => {
//     try {
//         // find animal and then delete
//         let deletedAnimal = await Animal.findByIdAndDelete(req.params.id)

//         // console.log(deletedAnimal)
        
//         // redirect back to index page
//         res.redirect('/animals')

//     // try {
//     } catch (err) {
//         // res.send('Delete Route error')
//         res.status(500).send('delete not successful')
//     }
// })




// // Create - POST
// app.post('/animals', async (req, res) => {
//     // res.send('received') - testing in Thunderclient
//     try {
//         if (req.body.extinct === 'on') {
//             // if checked
//             req.body.extinct = true
//     } else {
//             // if not checked
//             req.body.extinct = false
//     }
//         let newAnimal = await Animal.create(req.body)
//         // res.send(newAnimal)
//         res.redirect('/animals')

//         // try {
//     } catch (err) {
//         res.send('Create Route error')
//     }
// })




// // Edit
// app.get('/animals/edit/:id', async (req, res) => {
//     try {
//         // find the animal to edit
//         let foundAnimal = await Animal.findById(req.params.id)
//         res.render('edit.ejs', { animal: foundAnimal})
//     } catch (error) {
//         res.send('Edit Route error')
//     }
// })




// // Update
// app.put('/animals/:id', async (req, res) => {
//     try {
//         // handle the checkbox
//         if(req.body.extinct === 'on') {
//             req.body.extinct = true
//         } else {
//             req.body.extinct = false
//         }

//         // find by id and update with the req. body
//         let updatedAnimal = await Animal.findByIdAndUpdate(req.params.id,req.body)

//         // redirect to the show route with the updated animal
//         // res.send(req.body)
//         res.redirect(`/animals/${updatedAnimal._id}`)

//         // try {
//     } catch(error) {
//         res.send('Update Route error')
//     }
// })




// // Seed
// app.get('/animals/seed', async (req, res) => {
//     try {
//         // delete all animals in the db
//         await Animal.deleteMany({})

//         // create starter Animals in db
//         await Animal.create(
//             // [
//             //     { species: "Cat", extinct: "false", location: "Salem, NC", lifeExpectancy: "9" },
//             //     { species: "Monkey", extinct: "true", location: "San Diego, CA", lifeExpectancy: "100" },
//             //     { species: "Elephant", extinct: "true", location: "Africa", lifeExpectancy: "99" },
//             //     { species: "Fish", extinct: "false", location: "Denver, CO", lifeExpectancy: "38"},
//             //     { species: "Vizsla", extinct: "false", location: "Chula Vista", lifeExpectancy: "7" },
//             // ]
//             seedAnimal
//         )

//         // redirect back to the index
//         res.redirect('/animals')

//     } catch (error) {
//         res.send('Seed Route error')
//     }
// })




// // Show - always last
// app.get('/animals/:id', async (req, res) => {
//     // find an animal by _id
//     let foundAnimal = await Animal.findById(req.params.id)

//     // console.log(foundAnimal)

//     // render show.ejs with the foundAnimal
//     res.render('show.ejs', { animal: foundAnimal })
// })




/**
 * SERVER LISTENER
 */

app.listen(PORT, () => console.log(`Listening on ${PORT}`))