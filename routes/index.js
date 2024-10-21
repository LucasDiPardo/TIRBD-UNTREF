const { Contenido } = require('./contenidoRoutes');
const { Genero } = require('./generoRoutes');

// Definir las asociaciones
Contenido.belongsTo(Genero, { foreignKey: 'genero_id' });
Genero.hasMany(Contenido, { foreignKey: 'genero_id' });

module.exports = { Contenido, Genero };
