/**
 * DEPENDENCIES
 */

const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema ({
    species: {type: String, required: true},
    extinct: {type: Boolean, required: true},
    location: {type: String, required: true},
    lifeExpectancy: {type: Number, required: true}
})

const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal