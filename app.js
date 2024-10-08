const express = require('express');
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');
const db = require('./conexion/database');

// Middlewares
app.use(express.json());
app.use('/contenido', contenidoRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





/*

const { Actor } = require('./src/modelos/actor')
const { Categoria } = require('./src/modelos/categorias')
const { ContenidoActorView } = require('./src/modelos/contenido_actor')
const { Contenido } = require('./src/modelos/contenido')
const { Genero } = require('./src/modelos/generos')

const { sequelize } = require('./src/conexion/conexion')
const { Op } = require('sequelize')
const express = require('express')
const app = express()
const port = 3001

app.use(express.json())
app.use(async (req,res,next) => {
  try {
    await sequelize.authenticate()
    console.log('Conexión establecida con exito ! =)')
    await Actor.sync()
    await Categoria.sync()
    await ContenidoActorView.sync()
    await Contenido.sync()
    await Genero.sync()
    next()
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/categorias', async (req, res) => {
    try {
        const categorias = await Categoria.findAll()
        categorias.length > 0 ? res.status(200).json(categorias)
        : res.status(404).json({error: "No encontramos categorias cargadas"})
    } catch (error) {
        res.status(500).json({error: `Error en el servidor: `,description: error.message})
    } 
})
            
/*
app.get('/productos', async (req, res) => {
  try {
    const products = await Product.findAll(
      {order: [['CategoryID','ASC'],['productName','DESC']]}
    )
    products.length > 0 ? res.status(200).json(products)
    : res.status(404).json({error: "No encontramos productos cargados"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/productos/:productID', async (req, res) => {
  try {
    const { productID } = req.params
    const product = await Product.findByPk(productID)
    product ? res.json(product)
    : res.status(404).json({error: "Producto no encontrado"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/productos/nombre/:productName', async (req, res) => {
  try {
    const { productName } = req.params
    const product = await Product.findOne({where: {productName}})
    product ? res.json(product)
    : res.status(404).json({error: "Producto no encontrado"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/productos/categoria/:CategoryID', async (req, res) => {
  try {
    const { CategoryID } = req.params
    const products = await Product.findAll({where: {CategoryID}})
    products ? res.json(products)
    : res.status(404).json({error: "Producto no encontrado"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/productos/buscar/:query', async (req, res) => {
  try {
    const { query } = req.params
    const product = await Product.findAll({where: 
      {productName: {
        [Op.like]: `%${query}%`
      }}
    })
    product ? res.json(product)
    : res.status(404).json({error: "Producto no encontrado"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/productos/importeMayor/:query', async (req, res) => {
  try {
    const { query } = req.params
    const product = await Product.findAll({
      where: 
        {UnitPrice: {
          [Op.gt]: query
        }},
      order: [['UnitPrice', 'ASC']]
    })
    product ? res.json(product)
    : res.status(404).json({error: "Producto no encontrado"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/productos/:campo/:valor', async (req, res) => {
  try {
    const { campo, valor } = req.params
    const query = {[campo]: valor}
    const product = await Product.findOne({where: {query}})
    product ? res.json(product)
    : res.status(404).json({error: "Producto no encontrado"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})

app.get('/empleados', async (req, res) => {
  try {
    const employees = await Employee.findAll()
    employees.length > 0 ? res.status(200).json(employees)
    : res.status(404).json({error: "No encontramos empleados cargados"})
  } catch (error) {
    res.status(500).json({error: `Error en el servidor: `,description: error.message})
  } 
})



app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

*/
    