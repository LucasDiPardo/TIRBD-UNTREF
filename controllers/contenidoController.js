// Controlador para traer todos los contenidos
const { Contenido } = require("../models/contenido")


const getAllContenidos = async(req, res) => {
  try{
    const db = req.app.get('db')
    await db.authenticate()
    await Contenido.sync()
    
    const contenidos = await Contenido.findAll()
    contenidos.length > 0 ? res.status(200).json(contenidos)
        : res.status(404).json({error: "No encontramos contenidos cargados"})
  }catch(error){
    console.log(error)
    res.status(500).json({message: "Error al obtener Contenidos"})
  }
    
  }
  
  const getContenidoById = (req, res) => {
    const contenidoID = req.params.id
    res.send(`Aca esta el contenido que solicitaste: ${contenidoID}`)
  }
  
  const createContenido = (req, res) => {
    res.send('Creando una nuevo contenido')
  }
  
  module.exports = { getAllContenidos, createContenido, getContenidoById }