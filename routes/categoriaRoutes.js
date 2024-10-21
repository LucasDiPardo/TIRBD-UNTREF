const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController.js')

// GET a /categoria para traer todas las categorias
router.get('/', categoriaController.getAllCategories)

// GET a /categoria para traer todos las categorias
router.get('/:id', categoriaController.getCategoriaById)

// GET a /categoria/ para traer todos las categorias
router.get('/buscarCategoria/:nombre', categoriaController.buscarCategoria)

// POST a /categoria para crear una categoria
router.post('/', categoriaController.createCategoria)



module.exports = router;