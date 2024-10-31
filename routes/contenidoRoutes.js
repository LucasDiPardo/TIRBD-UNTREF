const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");

// GET a /buscarContenido para buscar contenidos con filtros dinámicos
/**
 * @swagger
 * /contenido/buscarContenido:
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
 *                   $ref: '#/components/schemas/Contenido'
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



// GET a /contenido para traer todos los contenidos
/**
 * @swagger
 * /contenido:
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

// GET a /contenido/:id para traer un contenido por ID
/**
 * @swagger
 * /contenido/{id}:
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

/**
 * @swagger
 * /contenido/createContenido:
 *   post:
 *     summary: Crear nuevo contenido
 *     description: Endpoint para crear un nuevo contenido en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poster:
 *                 type: string
 *                 description: URL del poster del contenido.
 *               titulo:
 *                 type: string
 *                 description: Título del contenido.
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido.
 *               temporadas:
 *                 type: integer
 *                 description: Número de temporadas (si aplica).
 *               trailer:
 *                 type: string
 *                 description: URL del trailer del contenido.
 *               categoria_id:
 *                 type: integer
 *                 description: ID de la categoría del contenido.
 *               genero_id:
 *                 type: integer
 *                 description: ID del género del contenido.
 *               actores_id:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de actores asociados al contenido.
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del contenido creado.
 *                 poster:
 *                   type: string
 *                   description: URL del poster del contenido.
 *                 titulo:
 *                   type: string
 *                   description: Título del contenido.
 *                 resumen:
 *                   type: string
 *                   description: Resumen del contenido.
 *                 temporadas:
 *                   type: integer
 *                   description: Número de temporadas.
 *                 trailer:
 *                   type: string
 *                   description: URL del trailer del contenido.
 *                 categoria:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       description: Nombre de la categoría.
 *                 genero:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       description: Nombre del género.
 *                 actores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         description: Nombre del actor.
 *       400:
 *         description: Solicitud incorrecta. Datos inválidos.
 *         content:
 *           application/json:
 *             example:
 *               error: "El contenido ya existe" # o "Uno o más actores no existen"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error al crear Contenido"
 */
router.post("/createContenido", contenidoController.createContenido);

// PUT a /contenido/{id} para actualizar un contenido existente
/**
 * @swagger
 * /contenido/{id}:
 *   put:
 *     summary: Actualizar contenido existente
 *     description: Endpoint para actualizar un contenido existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poster:
 *                 type: string
 *                 description: URL del poster del contenido.
 *               titulo:
 *                 type: string
 *                 description: Título del contenido.
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido.
 *               temporadas:
 *                 type: integer
 *                 description: Número de temporadas (si aplica).
 *               trailer:
 *                 type: string
 *                 description: URL del trailer del contenido.
 *               categoria_id:
 *                 type: integer
 *                 description: ID de la categoría del contenido.
 *               genero_id:
 *                 type: integer
 *                 description: ID del género del contenido.
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contenido'  # Referencia al esquema Contenido
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
 *               message: "Error al actualizar Contenido"
 */
router.put("/:id", contenidoController.updateContenido);

// DELETE a /contenido/{id} para eliminar un contenido existente
/**
 * @swagger
 * /contenido/{id}:
 *   delete:
 *     summary: Eliminar contenido existente
 *     description: Endpoint para eliminar un contenido existente de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido eliminado satisfactoriamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Contenido eliminado satisfactoriamente."
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
 *               message: "Error al eliminar Contenido"
 */
router.delete("/:id", contenidoController.deleteContenido);

module.exports = router;
