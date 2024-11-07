require("dotenv").config();

const express = require("express");
require("./models/associations");
const { sequelize } = require("./conexion/database");
const contenidoRoutes = require("./routes/contenidoRoutes");
const actorRoutes = require("./routes/actorRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const generoRoutes = require("./routes/generoRoutes");
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require("./utils/swagger.config");
const app = express();
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});
app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con éxito");
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use("/contenido", contenidoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/generos", generoRoutes);
app.use("/actores", actorRoutes);

app.get("/", (req, res) => {
  res.status(200).send("¡Bienvenido a la API de Series y Peliculas!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.set("db", sequelize);


const PORT = process.env.PORT || 3000;
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(process.env)
    console.error("Error al sincronizar la base de datos:", error);
  });
