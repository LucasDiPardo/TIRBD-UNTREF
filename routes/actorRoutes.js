const express = require('express')
const router = express.Router()
const actorController = require('../controllers/actorController.js')


// GET a /actores para traer todos los actores
/**
 * @swagger
 * /actores:
 *   get:
 *     summary: Obtener todos los actores
 *     description: Endpoint para obtener una lista de todos los actores en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de actores.
 *         content:
 *           application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Actor'  # Referencia al esquema Actor definido en swagger.config.js
 *       404:
 *         description: No se encontraron actores para listar.
 *         content:
 *           application/json:
 *             example:
 *               error: "No encontramos actores cargados"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener actores"
 */
router.get('/', actorController.getAllActors)

// GET a /actores para traer un actor por ID
/**
 * @swagger
 * /actores/{id}:
 *   get:
 *     summary: Obtener un actor por ID
 *     description: Endpoint para obtener un actor específico de la base de datos utilizando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del actor a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve un actor específico.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Actor'  # Referencia al esquema Actor
 *       404:
 *         description: Actor no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Actor no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener Actor"
 */
router.get('/:id', actorController.getActorById)

// POST a /actores para crear un nuevo actor
/**
 * @swagger
 * /actores:
 *   post:
 *     summary: Crear un nuevo actor
 *     description: Endpoint para crear un nuevo actor en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Actor'  # Referencia al esquema Actor
 *     responses:
 *       201:
 *         description: Actor creado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Actor creado exitosamente"
 *       400:
 *         description: Solicitud incorrecta. Datos inválidos.
 *         content:
 *           application/json:
 *             example:
 *               error: "Datos inválidos proporcionados"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al crear actor"
 */
router.post('/createActor', actorController.createActor)


module.exports = router