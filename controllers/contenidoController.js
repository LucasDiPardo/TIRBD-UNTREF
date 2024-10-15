// controllers/contenidoController.js
const { Contenido } = require("../models/contenido");

const getAllContenidos = async (req, res) => {
  try {
    await Contenido.sync();
    const contenidos = await Contenido.findAll();
    contenidos.length > 0
      ? res.status(200).json(contenidos)
      : res.status(404).json({ error: "No encontramos contenidos cargados" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener Contenidos" });
  }
};

const getContenidoById = async (req, res) => {
  const contenidoId = req.params.id
  res.send(`Aca esta el contenido que solicitaste: ${contenidoId}`)
};

const createContenido = async (req, res) => {
  res.send(`Aca esta se crea el contenido.`)
};

const updateContenido = async (req, res) => {
  res.send(`Aca esta se actualiza el contenido.`)
};

const deleteContenido = async (req, res) => {
  res.send(`Aca esta se borra el contenido.`)
};

module.exports = { getAllContenidos, getContenidoById, createContenido, updateContenido, deleteContenido };
