const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController.js");

// GET a /categorias para traer todas las categorias
/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Endpoint para obtener una lista de todas las categorías en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de categorías.
 *         content:
 *           application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Categoria'  # Referencia al esquema Categoria definido en swagger.config.js
 *       404:
 *         description: No se encontraron categorías para listar.
 *         content:
 *           application/json:
 *             example:
 *               error: "No encontramos categorías cargadas"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener categorías"
 */
router.get("/", categoriaController.getAllCategories);

// GET a /categorias/:id para traer una categoría por ID
/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     description: Endpoint para obtener una categoría específica de la base de datos utilizando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la categoría a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una categoría específica.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Categoria'  # Referencia al esquema Categoria
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               error: "Categoría no encontrada"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener categoría"
 */
router.get("/:id", categoriaController.getCategoriaById);

// GET a /categorias/buscarCategoria/:nombre para buscar una categoría por nombre
/**
 * @swagger
 * /categorias/buscarCategoria/{nombre}:
 *   get:
 *     summary: Buscar una categoría por nombre
 *     description: Endpoint para buscar una categoría específica de la base de datos utilizando su nombre.
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         description: Nombre de la categoría a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una categoría específica.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Categoria'  # Referencia al esquema Categoria
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               error: "Categoría no encontrada"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al buscar categoría"
 */
router.get("/buscarCategoria/:nombre", categoriaController.buscarCategoria);

// POST a /categorias/createCategoria para crear una nueva categoría
/**
 * @swagger
 * /categorias/createCategoria:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Endpoint para crear una nueva categoría en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría a crear.
 *                 example: "Acción"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'  # Referencia al esquema Categoria
 *             example:
 *               id: 1
 *               nombre: "Acción"
 *       400:
 *         description: Categoría ya existe.
 *         content:
 *           application/json:
 *             example:
 *               error: "Categoria ya existe"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al crear Categoria"
 */
router.post("/createCategoria", categoriaController.createCategoria);

module.exports = router;
