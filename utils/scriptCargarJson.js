const fs = require("fs").promises;
const { Actor } = require("../models/actor");
const { Categoria } = require("../models/categoria");
const { Contenido } = require("../models/contenido");
const { Genero } = require("../models/genero");
const { ContenidoActorView } = require("../models/contenidoAndActores");
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
        // Process Categoria
        const [categoria] = await Categoria.findOrCreate({
          where: { nombre: item.categoria },
          defaults: { nombre: item.categoria },
          transaction: t,
        });

        // Process Genero (using gen field as primary genre)
        const [genero] = await Genero.findOrCreate({
          where: { nombre: item.gen },
          defaults: { nombre: item.gen },
          transaction: t,
        });

        // Create Contenido
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

        // Process Actors
        const actorNames = item.reparto.split(", ");
        for (const actorName of actorNames) {
          const [actor] = await Actor.findOrCreate({
            where: { nombre: actorName },
            defaults: { nombre: actorName },
            transaction: t,
          });

          // Create relationship in ContenidoActorView
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

    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error processing data:", error);
    throw error;
  }
}

async function importContentFromFile(filePath) {
  try {
    console.log("Starting import process...");

    // Connect to database
    await sequelize.authenticate();
    console.log("Database connection established.");

    // Read and parse the file
    const jsonData = await readJsonFile(filePath);
    console.log(`Read ${jsonData.length} items from file.`);

    // Process the data
    await processData(jsonData);
  } catch (error) {
    console.error("Import failed:", error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Export the main function
module.exports = {
  importContentFromFile,
};

// Example usage
if (require.main === module) {
  const filePath = "./json/trailerflix.json"; // Replace with your actual file path
  importContentFromFile(filePath)
    .then(() => console.log("Import process completed"))
    .catch(console.error);
}