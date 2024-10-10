// Controlador para traer todos los actores
const { Actor } = require("../models/actor")

const getAllActors = async(req, res) => {
  try{
    const db = req.app.get('db')
    await db.authenticate()
    await Actor.sync()
    
    const actores = await Actor.findAll()
    actores.length > 0 ? res.status(200).json(actores)
        : res.status(404).json({error: "No encontramos actores cargados"})
  }catch(error){
    console.log(error)
    res.status(500).json({message: "Error al obtener actores"})
  }
  }
  
  const getActorById = (req, res) => {
    const userId = req.params.id
    res.send(`Aca esta el usuario que solicitaste: ${userId}`)
  }
  
  const createActor = (req, res) => {
    res.send('Creando un nuevo usuario...')
  }
  
  module.exports = { getAllActors, createActor, getActorById }