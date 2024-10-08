const express = require('express')
const router = express.Router()
const actorController = require('../controllers/actorController.js')

// GET a /actor para traer todos los actores
router.get('/', actorController.getAllActors)

// GET a /actor para traer todos los actores
router.get('/:id', actorController.getActorById)

// POST a /actor para crear un actores
router.post('/', actorController.createActor)

module.exports = router