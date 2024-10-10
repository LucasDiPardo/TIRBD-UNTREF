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
  
  const getGeneroById = (req, res) => {
    const generoId = req.params.id
    res.send(`Aca esta el genero que solicitaste: ${generoId}`)
  }
  
  const createGenero = (req, res) => {
    res.send('Creando una nuevo genero')
  }
  
  module.exports = { getAllGeneros, createGenero, getGeneroById }