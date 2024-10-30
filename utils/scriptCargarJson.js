const fs = require("fs").promises;
const { Actor } = require("../models/actor");
const { Categoria } = require("../models/categoria");
const { Contenido } = require("../models/contenido");
const { Genero } = require("../models/genero");
const { ContenidoActorView } = require("../models/contenidoActorView");
const { sequelize } = require("../conexion/database");

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

async function processData(jsonData) {
  try {
    await sequelize.transaction(async (t) => {
      for (const item of jsonData) {
        const [categoria] = await Categoria.findOrCreate({
          where: { nombre: item.categoria },
          defaults: { nombre: item.categoria },
          transaction: t,
        });

        const [genero] = await Genero.findOrCreate({
          where: { nombre: item.gen },
          defaults: { nombre: item.gen },
          transaction: t,
        });

        const contenido = await Contenido.create(
          {
            poster: item.poster,
            titulo: item.titulo,
            resumen: item.resumen,
            temporadas: !!parseInt(item.temporadas)
              ? parseInt(item.temporadas)
              : 0,
            trailer: item.trailer,
            categoria_id: categoria.id,
            genero_id: genero.id,
          },
          { transaction: t }
        );

        const actorNames = item.reparto.split(", ");
        for (const actorName of actorNames) {
          const [actor] = await Actor.findOrCreate({
            where: { nombre: actorName },
            defaults: { nombre: actorName },
            transaction: t,
          });

          await ContenidoActorView.create(
            {
              contenido_id: contenido.id,
              actor_id: actor.id,
            },
            { transaction: t }
          );
        }
      }
    });

    console.log("Importacion de datos Completada!");
  } catch (error) {
    console.error("Error procesando datos:", error);
    throw error;
  }
}

async function importContentFromFile(filePath) {
  try {
    console.log("Comenzando a importar..");


    await sequelize.authenticate();
    console.log("DB Conexion establecida.");

    const jsonData = await readJsonFile(filePath);
    console.log(`Read ${jsonData.length} items from file.`);

    await processData(jsonData);
  } catch (error) {
    console.error("Fallo la importacion:", error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

module.exports = {
  importContentFromFile,
};

if (require.main === module) {
  const filePath = "./json/trailerflix.json"; 
  importContentFromFile(filePath)
    .then(() => console.log("Proceso de importar Completado"))
    .catch(console.error);
}
