const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');

// routes
router.get('/buscarContenidoPorGenero', contenidoController.buscarContenidoPorGenero)
router.get('/buscarContenido', contenidoController.buscarContenido)
router.get('/', contenidoController.getAllContenidos);
router.get('/:id', contenidoController.getContenidoById);
router.post('/', contenidoController.createContenido);
router.put('/:id', contenidoController.updateContenido);
router.delete('/:id', contenidoController.deleteContenido);


module.exports = router;
