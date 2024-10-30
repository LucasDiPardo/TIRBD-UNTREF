const express = require('express');
const { sequelize } = require('./conexion/database');
const contenidoRoutes = require('./routes/contenidoRoutes');
const actorRoutes = require('./routes/actorRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const generoRoutes = require('./routes/generoRoutes');
const { swaggerUi, swaggerDocs } = require("./utils/swagger.config");
const bodyParser = require("body-parser");

const app = express();


// Middlewares
app.use(express.json());
app.use(bodyParser.json())

// Swagger Config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito');
    // sincronizar los modelos si es necesario
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor', description: error.message });
  }
});

// enrutadores
app.use('/contenido', contenidoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/generos', generoRoutes);
app.use('/actores', actorRoutes);
app.get('/', (req, res) => {
  res.status(200).send('¡Bienvenido a la API de Series y Peliculas!');
});

app.set('db', sequelize);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server funcionando en el puerto ${PORT}`);
});
