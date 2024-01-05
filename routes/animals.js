/**
 * DEPENDENCIES
 */

const express = require('express')
const router = express.Router() // create a Router to place inside our server to then access all of these routes programmatically
const controller = require('../controllers/animals.js');




/**
 * Routes INDUCESS (because of Seed)
 */

// change all app. to router and remove 'animals but keep /'
// change await Animal. to await req.model.Animal.
// copy everything after async and paste to animals.js controllers, remove everything after async)
// add in controller.INDUCESS




// Index
router.get('/', controller.index)




// New - GET for the form to create a new animal
router.get('/new', controller.newForm)




// Delete
router.delete('/:id', controller.destroy)




// Update
router.put('/:id', controller.update)




// Create - POST
router.post('/', controller.create)




// Edit
router.get('/edit/:id', controller.edit)




// Seed
router.get('/seed', controller.seed)




// Show - always last
router.get('/:id', controller.show)




// Export router
module.exports = router