// Controlador para traer todos los generos
const getAllGeneros = (req, res) => {
    res.send('Aca estan todos los generos')
  }
  
  const getGeneroById = (req, res) => {
    const generoId = req.params.id
    res.send(`Aca esta el genero que solicitaste: ${generoId}`)
  }
  
  const createGenero = (req, res) => {
    res.send('Creando una nuevo genero')
  }
  
  module.exports = { getAllGeneros, createGenero, getGeneroById }