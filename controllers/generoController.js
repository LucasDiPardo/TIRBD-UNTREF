// Controlador para traer todos los generos
const { Genero } = require("../models/genero")

const getAllGeneros = async (req, res) => {
    try{
      const db = req.app.get('db')
      await db.authenticate()
      await Genero.sync()
      
      const generos = await Genero.findAll()
      generos.length > 0 ? res.status(200).json(generos)
          : res.status(404).json({error: "No encontramos generos cargadas"})
    }catch(error){
      console.log(error)
      res.status(500).json({message: "Error al obtener generos"})
    }
  }
  
  const getGeneroById = async(req, res) => {
    try {
      const generoID = req.params.id;
      const genero = await Genero.findByPk(generoID);
      genero
        ? res.status(200).json(genero)
        : res.status(404).json({ error: "Genero no encontrado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener Genero" });
    }
  }
  
  const createGenero = (req, res) => {
    res.send('Creando una nuevo genero')
  }
  
  module.exports = { getAllGeneros, createGenero, getGeneroById }