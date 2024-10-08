// Controlador para traer todas las categorias
const getAllCategories = (req, res) => {
    res.send('Aca estan todas las categorias')
  }
  
  const getCategoriaById = (req, res) => {
    const categoriaId = req.params.id
    res.send(`Aca esta la categoria que solicitaste: ${categoriaId}`)
  }
  
  const createCategoria = (req, res) => {
    res.send('Creando una nueva categoria')
  }
  
  module.exports = { getAllCategories, createCategoria, getCategoriaById }