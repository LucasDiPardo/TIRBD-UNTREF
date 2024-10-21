const { sequelize } = require("../conexion/database")
const { Categoria } = require("../models/categoria")

// Controlador para traer todas las categorias
const getAllCategories = async (req, res) => {
  try{
    const db = req.app.get('db')
    await db.authenticate()
    await Categoria.sync()
    
    const categorias = await Categoria.findAll()
        categorias.length > 0 ? res.status(200).json(categorias)
        : res.status(404).json({error: "No encontramos categorias cargadas"})
  }catch(error){
    console.log(error)
    res.status(500).json({message: "Error al obtener categorias"})
  }
  }
  
  const getCategoriaById = async(req, res) => {
    try {
      const categoriaID = req.params.id;
      const categoria = await Categoria.findByPk(categoriaID);
      categoria
        ? res.status(200).json(categoria)
        : res.status(404).json({ error: "Categoria no encontrado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener Categoria" });
    }
  }
  
  const buscarCategoria = async (req, res) => {
    try {
      const nombreABuscar = req.params.nombre;
      const categoria = await Categoria.findOne({ where: { nombre: nombreABuscar } });
      categoria ? res.status(200).json(categoria)
        : res.status(404).json({ error: "Categoria no encontrado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la Categoria buscada" });
    }
  };

  const createCategoria = (req, res) => {
    res.send('Creando una nueva categoria')
  }
  
  module.exports = { getAllCategories, createCategoria, getCategoriaById, buscarCategoria }