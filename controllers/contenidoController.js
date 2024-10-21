const { Contenido } = require("../models/contenido");
const {Genero} = require ("../models/genero")
const {Op} = require('sequelize')

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
  try {
    const contenidoID = req.params.id;
    const contenido = await Contenido.findByPk(contenidoID);
    contenido
      ? res.status(200).json(contenido)
      : res.status(404).json({ error: "Contenido no encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener Contenido" });
  }
};

const buscarContenido = async (req, res) => {
  try {
    const { titulo } = req.query;
    if (!titulo) {
      return res.status(400).json({ error: "El título es requerido" });
    }
    const contenido = await Contenido.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`
        }
      }
    });

    contenido.length > 0
      ? res.status(200).json(contenido)
      : res.status(404).json({ error: "Contenido no encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el Contenido buscado" });
  }
};

const buscarContenidoPorGenero = async (req, res) => {
  try {
    const { nombreGenero } = req.query;
    if (!nombreGenero) {
      return res.status(400).json({ error: 'El nombre del género es requerido' });
    }

    const genero = await Genero.findOne({ where: { nombre: nombreGenero } });
    if (!genero) {
      return res.status(404).json({ error: 'Género no encontrado' });
    }
    console.log(genero)

    const contenidos = await Contenido.findAll({
      where: { genero_id: genero.id },
      include: [{ model: Genero }]
    });

    contenidos.length > 0
      ? res.status(200).json(contenidos)
      : res.status(404).json({ error: 'No se encontraron contenidos para este género' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los contenidos por género' });
  }
};

const createContenido = async (req, res) => {
  try {
    const { poster, titulo, resumen, temporadas, trailer, categoria_id, genero_id } = req.body;
    const nuevoContenido = await Contenido.create({
      poster,
      titulo,
      resumen,
      temporadas,
      trailer,
      categoria_id,
      genero_id,
    });
    res.status(201).json(nuevoContenido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear Contenido" });
  }
};

const updateContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const { poster, titulo, resumen, temporadas, trailer, categoria_id, genero_id } = req.body;
    const [updated] = await Contenido.update({
      poster,
      titulo,
      resumen,
      temporadas,
      trailer,
      categoria_id,
      genero_id,
    }, {
      where: { id },
    });

    if (updated) {
      const updatedContenido = await Contenido.findByPk(id);
      res.status(200).json(updatedContenido);
    } else {
      res.status(404).json({ error: "Contenido no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar Contenido" });
  }
};

const deleteContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contenido.destroy({
      where: { id },
    });

    deleted
      ? res.status(204).json()
      : res.status(404).json({ error: "Contenido no encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar Contenido" });
  }
};

module.exports = { getAllContenidos, getContenidoById, createContenido, updateContenido, deleteContenido, buscarContenido, buscarContenidoPorGenero };
