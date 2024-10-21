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
  
  const getActorById = async(req, res) => {
    try {
      const userID = req.params.id;
      const actor = await Actor.findByPk(userID);
      actor
        ? res.status(200).json(actor)
        : res.status(404).json({ error: "Actor no encontrado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener Actor" });
    }
  }
  
  const createActor = (req, res) => {
    res.send('Creando un nuevo usuario...')
  }
  
  module.exports = { getAllActors, createActor, getActorById }