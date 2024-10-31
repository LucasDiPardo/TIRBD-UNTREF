const { Contenido } = require("../models/contenido");
const { Genero } = require("../models/genero");
const { Categoria } = require("../models/categoria");
const { Actor } = require("../models/actor");
const { sequelize } = require("../conexion/database");
const { Op } = require("sequelize");
const { ContenidoActorView } = require("../models/contenidoActorView");

const getAllContenidos = async (req, res) => {
  try {
    await Contenido.sync();
    const contenidos = await Contenido.findAll({
      include: [
        { model: Genero, attributes: ["nombre"] },
        { model: Categoria, attributes: ["nombre"] },
        { model: Actor, attributes: ["nombre"], through: { attributes: [] } },
      ],
    });
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
    const contenido = await Contenido.findByPk(contenidoID, {
      include: [
        { model: Genero, attributes: ["nombre"] },
        { model: Categoria, attributes: ["nombre"] },
        { model: Actor, attributes: ["nombre"], through: { attributes: [] } },
      ],
    });
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
    const { titulo, genero, categoria } = req.query;

    const whereContenido = {};
    const whereGenero = {};
    const whereCategoria = {};

    if (titulo) {
      whereContenido.titulo = { [Op.like]: `%${titulo}%` };
    }

    if (genero) {
      whereGenero.nombre = { [Op.like]: `%${genero}%` };
    }

    if (categoria) {
      whereCategoria.nombre = { [Op.like]: `%${categoria}%` };
    }

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
        { model: Actor, attributes: ["nombre"], through: { attributes: [] } },
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
  const {
    poster,
    titulo,
    resumen,
    temporadas,
    trailer,
    categoria_id,
    genero_id,
  } = datos;

  if (!poster) return "El campo 'poster' es requerido.";
  if (!titulo) return "El campo 'titulo' es requerido.";
  if (!resumen) return "El campo 'resumen' es requerido.";
  if (temporadas === undefined) return "El campo 'temporadas' es requerido.";
  if (!trailer) return "El campo 'trailer' es requerido.";
  if (!categoria_id) return "El campo 'categoria_id' es requerido.";
  if (!genero_id) return "El campo 'genero_id' es requerido.";
}

const createContenido = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      poster,
      titulo,
      resumen,
      temporadas,
      trailer,
      categoria_id,
      genero_id,
      actores_id,
    } = req.body;

    const error = validar(req.body);

    if (error) {
      await t.rollback();
      return res.status(400).json({ error });
    }

    const nuevoContenido = await Contenido.create(
      {
        poster,
        titulo,
        resumen,
        temporadas,
        trailer,
        categoria_id,
        genero_id,
      },
      { transaction: t }
    );

    if (actores_id && actores_id.length > 0) {
      const actoresExistentes = await Actor.findAll({
        where: { id: actores_id },
        transaction: t,
      });

      if (actoresExistentes.length !== actores_id.length) {
        await t.rollback();
        return res.status(400).json({ error: "Uno o más actores no existen" });
      }

      await nuevoContenido.addActors(actoresExistentes, { transaction: t });
    }

    await t.commit();

    const contenidoCreado = await Contenido.findByPk(nuevoContenido.id, {
      include: [
        { model: Genero, attributes: ["nombre"] },
        { model: Categoria, attributes: ["nombre"] },
        { model: Actor, attributes: ["nombre"], through: { attributes: [] } },
      ],
    });

    res.status(201).json(contenidoCreado);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al crear Contenido" });
  }
};

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
      const updatedContenido = await Contenido.findByPk(id, {
        include: [
          { model: Genero, attributes: ["nombre"] },
          { model: Categoria, attributes: ["nombre"] },
          { model: Actor, attributes: ["nombre"], through: { attributes: [] } },
        ],
      });
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
  const { id } = req.params;
  try {
    const result = await sequelize.transaction(async (t) => {
    await ContenidoActorView.destroy({
      where: { contenido_id: id },
      transaction: t,
    });

    const deleted = await Contenido.destroy({
      where: { id },
      transaction: t,
    });
    
    return deleted;
  });
    if (result) {
      res
        .status(200)
        .json({ message: "Contenido eliminado satisfactoriamente." });
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
