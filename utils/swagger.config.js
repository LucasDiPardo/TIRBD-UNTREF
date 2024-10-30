const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Contenidos",
      version: "1.0.0",
      description: "Documentación generada con Swagger para la API de Series y Peliculas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Actor: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del actor",
              example: 1,
            },
            nombre: {
              type: "string",
              description: "Nombre del actor",
              example: "Juan",
            },
          },
          required: ["nombre"],
        },
        Categoria: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único de la categoría",
              example: 1,
            },
            nombre: {
              type: "string",
              description: "Nombre de la categoría",
              example: "Drama",
            },
          },
          required: ["nombre"],
        },
        Genero: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del género",
              example: 1,
            },
            nombre: {
              type: "string",
              description: "Nombre del género",
              example: "Acción",
            },
          },
          required: ["nombre"],
        },
        Contenido: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del contenido",
              example: 1,
            },
            poster: {
              type: "string",
              description: "URL del poster del contenido",
              example: "http://example.com/poster.jpg",
            },
            titulo: {
              type: "string",
              description: "Título del contenido",
              example: "Película Épica",
            },
            resumen: {
              type: "string",
              description: "Resumen del contenido",
              example: "Una película épica que cuenta la historia de...",
            },
            temporadas: {
              type: "integer",
              description: "Número de temporadas del contenido",
              example: 1,
            },
            trailer: {
              type: "string",
              description: "URL del trailer del contenido",
              example: "http://example.com/trailer.mp4",
            },
            categoria_id: {
              type: "integer",
              description: "ID de la categoría a la que pertenece el contenido",
              example: 1,
            },
            genero_id: {
              type: "integer",
              description: "ID del género al que pertenece el contenido",
              example: 1,
            },
            actores: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Actor"
              }
            }
          },
          required: [
            "poster",
            "titulo",
            "resumen",
            "temporadas",
            "trailer",
            "categoria_id",
            "genero_id",
          ],
        },
        ContenidoActorView: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único de la relación entre contenido y actor",
              example: 1,
            },
            contenido_id: {
              type: "integer",
              description: "ID del contenido",
              example: 1,
            },
            actor_id: {
              type: "integer",
              description: "ID del actor",
              example: 1,
            },
          },
          required: ["contenido_id", "actor_id"],
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
