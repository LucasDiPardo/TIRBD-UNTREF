const { Contenido } = require("./contenido");
const { Actor } = require("./actor");
const { ContenidoActorView } = require("./contenidoActorView");
const { Genero } = require("./genero");
const { Categoria } = require("./categoria");


Contenido.belongsToMany(Actor, {
  through: ContenidoActorView,
  foreignKey: "contenido_id",
  onDelete: "CASCADE",
});
Actor.belongsToMany(Contenido, {
  through: ContenidoActorView,
  foreignKey: "actor_id",
});


Contenido.belongsTo(Genero, { foreignKey: "genero_id" });
Contenido.belongsTo(Categoria, { foreignKey: "categoria_id" });
