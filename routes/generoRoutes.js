const express = require('express')
const router = express.Router()
const generoController = require('../controllers/generoController.js')

// GET a /genero para traer todos los generos
router.get('/', generoController.getAllGeneros)

// GET a /genero para traer todos los generos
router.get('/:id', generoController.getGeneroById)

// POST a /genero para crear un genero
router.post('/', generoController.createGenero)

module.exports = router