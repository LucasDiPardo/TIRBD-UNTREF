// Controlador para traer todos los contenidos
const getAllContenidos = (req, res) => {
    res.send('Aca estan todos los contenidos')
  }
  
  const getContenidoById = (req, res) => {
    const contenidoID = req.params.id
    res.send(`Aca esta el contenido que solicitaste: ${contenidoID}`)
  }
  
  const createContenido = (req, res) => {
    res.send('Creando una nuevo contenido')
  }
  
  module.exports = { getAllContenidos, createContenido, getContenidoById }