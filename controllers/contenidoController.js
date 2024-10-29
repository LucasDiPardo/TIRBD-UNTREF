const { Contenido } = require("../models/contenido");
const { Genero } = require("../models/genero");
const { Categoria } = require("../models/categoria");
const { Op } = require("sequelize");

//Obtener todos los Contenidos
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

//Obtener un Contenido por ID
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

//Filtrar contenidos - Titulo, Genero o Categoria
const buscarContenido = async (req, res) => {
  try {
    const { titulo, genero, categoria } = req.query;

    // Crear objeto de filtro dinámico
    const whereContenido = {};
    const whereGenero = {};
    const whereCategoria = {};

    // Agregar filtros solo si están presentes
    if (titulo) {
      whereContenido.titulo = { [Op.like]: `%${titulo}%` };
    }

    if (genero) {
      whereGenero.nombre = { [Op.like]: `%${genero}%` };
    }

    if (categoria) {
      whereCategoria.nombre = { [Op.like]: `%${categoria}%` };
    }

    // Buscar contenidos con los filtros aplicados
    const contenidos = await Contenido.findAll({
      where: whereContenido,
      include: [
        {
          model: Genero,
          where: whereGenero,
          attributes: ["nombre"],
        },
        {
          model: Categoria,
          where: whereCategoria,
          attributes: ["nombre"],
        },
      ],
    });

    contenidos.length > 0
      ? res.status(200).json(contenidos)
      : res.status(404).json({ error: "Contenido no encontrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el contenido buscado" });
  }
};

function validar(datos) {
  //validar que el contenido no esté vacío
  const {
    poster,
    titulo,
    resumen,
    temporadas,
    trailer,
    categoria_id,
    genero_id,
  } = datos;

  // Validación de campos requeridos
  if (!poster) return "El campo 'poster' es requerido.";
  if (!titulo) return "El campo 'titulo' es requerido.";
  if (!resumen) return "El campo 'resumen' es requerido.";
  if (temporadas === undefined) return "El campo 'temporadas' es requerido.";
  if (!trailer) return "El campo 'trailer' es requerido.";
  if (!categoria_id) return "El campo 'categoria_id' es requerido.";
  if (!genero_id) return "El campo 'genero_id' es requerido.";
}

const createContenido = async (req, res) => {
  try {
    const {
      poster,
      titulo,
      resumen,
      temporadas,
      trailer,
      categoria_id,
      genero_id,
    } = req.body;

    const error= validar(req.body);

    if (!!error){
      return res.status(400).json({ error });
    }
    

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


//actualizar contenido desde id
const updateContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      poster,
      titulo,
      resumen,
      temporadas,
      trailer,
      categoria_id,
      genero_id,
    } = req.body;
    
    const [updated] = await Contenido.update(
      {
        poster,
        titulo,
        resumen,
        temporadas,
        trailer,
        categoria_id,
        genero_id,
      },
      {
        where: { id },
      }
    );

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


//Eliminar contenido desde una id
const deleteContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contenido.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(200).json({ message: "Contenido eliminado satisfactoriamente." });
    } else {
      res.status(404).json({ error: "Contenido no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar Contenido" });
  }
};





module.exports = {
  getAllContenidos,
  getContenidoById,
  createContenido,
  updateContenido,
  deleteContenido,
  buscarContenido,
};
