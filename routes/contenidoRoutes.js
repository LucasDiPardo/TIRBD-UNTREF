const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");

// GET a /buscarContenido para buscar contenidos con filtros dinámicos
/**
 * @swagger
 * /buscarContenido:
 *   get:
 *     summary: Buscar contenidos con filtros dinámicos
 *     description: Endpoint para buscar contenidos en la base de datos utilizando filtros dinámicos como título, género y/o categoría.
 *     parameters:
 *       - name: titulo
 *         in: query
 *         required: false
 *         description: Filtro por título del contenido.
 *         schema:
 *           type: string
 *       - name: genero
 *         in: query
 *         required: false
 *         description: Filtro por género del contenido.
 *         schema:
 *           type: string
 *       - name: categoria
 *         in: query
 *         required: false
 *         description: Filtro por categoría del contenido.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de contenidos filtrados.
 *         content:
 *           application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido definido en swagger.config.js
 *       404:
 *         description: No se encontraron contenidos que coincidan con los filtros.
 *         content:
 *           application/json:
 *             example:
 *               error: "No se encontraron contenidos"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al buscar contenidos"
 */
router.get("/buscarContenido", contenidoController.buscarContenido);

// GET a / para traer todos los contenidos
/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todos los contenidos
 *     description: Endpoint para obtener una lista de todos los contenidos en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de contenidos.
 *         content:
 *           application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido definido en swagger.config.js
 *       404:
 *         description: No se encontraron contenidos para listar.
 *         content:
 *           application/json:
 *             example:
 *               error: "No encontramos contenidos cargados"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener contenidos"
 */
router.get("/", contenidoController.getAllContenidos);

// GET a /:id para traer un contenido por ID
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtener un contenido por ID
 *     description: Endpoint para obtener un contenido específico de la base de datos utilizando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve un contenido específico.
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido
 *       404:
 *         description: Contenido no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Contenido no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al obtener contenido"
 */
router.get("/:id", contenidoController.getContenidoById);

// POST a /createContenido para crear un nuevo contenido
/**
 * @swagger
 * /createContenido:
 *   post:
 *     summary: Crear un nuevo contenido
 *     description: Endpoint para crear un nuevo contenido en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Contenido creado exitosamente"
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
 *               message: "Error al crear contenido"
 */
router.post("/createContenido", contenidoController.createContenido);

// PUT a /:id para actualizar un contenido existente
/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Actualizar un contenido existente
 *     description: Endpoint para actualizar un contenido específico en la base de datos utilizando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Contenido actualizado exitosamente"
 *       400:
 *         description: Solicitud incorrecta. Datos inválidos.
 *         content:
 *           application/json:
 *             example:
 *               error: "Datos inválidos proporcionados"
 *       404:
 *         description: Contenido no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Contenido no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al actualizar contenido"
 */
router.put("/:id", contenidoController.updateContenido);

// DELETE a /:id para eliminar un contenido
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Eliminar un contenido
 *     description: Endpoint para eliminar un contenido específico de la base de datos utilizando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido eliminado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Contenido eliminado exitosamente"
 *       404:
 *         description: Contenido no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: "Contenido no encontrado"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al eliminar contenido"
 */
router.delete("/:id", contenidoController.deleteContenido);

module.exports = router;
