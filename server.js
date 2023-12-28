/**
 * DEPENDENCIES
 */

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT || 3013;

/**
 * MIDDLEWARE
 */






/**
 * ROUTES
 */






/**
 * SERVER LISTENER
 */

app.listen(PORT, () => console.log(`Listening on ${PORT}`))