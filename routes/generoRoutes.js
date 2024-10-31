const express = require("express");
const router = express.Router();
const generoController = require("../controllers/generoController.js");

// GET a /generos para traer todos los géneros
/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Obtener todos los géneros
 *     description: Endpoint para obtener una lista de todos los géneros en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de géneros.
 *         content:
 *           application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Genero'  # Referencia al esquema Genero definido en swagger.config.js
 *       404:
 *         description: No se encontraron géneros para listar.
 *         content:
 *           application/json:
 *             example:
 *               error: "No encontramos géneros cargados"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener géneros"
 */
router.get("/", generoController.getAllGeneros);

// GET a /generos/:id para traer un género por ID
/**
 * @swagger
 * /generos/{id}:
 *   get:
 *     summary: Obtener un género por ID
 *     description: Endpoint para obtener un género específico de la base de datos utilizando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del género a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve un género específico.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Genero'  # Referencia al esquema Genero
 *       404:
 *         description: Género no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Género no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener género"
 */
router.get("/:id", generoController.getGeneroById);

// POST a /generos/createGenero para crear un nuevo género
/**
 * @swagger
 * /generos/createGenero:
 *   post:
 *     summary: Crear un nuevo género
 *     description: Endpoint para crear un nuevo género en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genero'  # Referencia al esquema Genero
 *     responses:
 *       201:
 *         description: Género creado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Género creado exitosamente"
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
 *               message: "Error al crear género"
 */
router.post("/createGenero", generoController.createGenero);

module.exports = router;
