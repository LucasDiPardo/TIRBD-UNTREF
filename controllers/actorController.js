// Controlador para traer todos los actores
const getAllActors = (req, res) => {
    res.send('Aca estan todos los actores')
  }
  
  const getActorById = (req, res) => {
    const userId = req.params.id
    res.send(`Aca esta el usuario que solicitaste: ${userId}`)
  }
  
  const createActor = (req, res) => {
    res.send('Creando un nuevo usuario...')
  }
  
  module.exports = { getAllActors, createActor, getActorById }