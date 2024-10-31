# Trabajo Integrador: CRUD con Node.js y MySQL

## Descripción del Proyecto

Desarrollarás una plataforma de streaming usando Node.js y MySQL. La aplicación permitirá realizar operaciones CRUD sobre una base de datos relacional basada en el archivo `trailerflix.json`.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)
- [Dependencias](#dependencias)
- [Documentacion - Swagger](#documentacion)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/LucasDiPardo/Trabajo-Integrador-Relacional-Backend-Diplomatura-UNTREF.git
   cd Trabajo-Integrador-Relacional-Backend-Diplomatura-UNTREF
   ```

2. Instalar las dependencias:

   ```bash
   npm install cors express mysql2 nodemon sequelize swagger-jsdoc swagger-ui-express

   ```

3. Configurar la base de datos:

   - Crear una base de datos en MySQL.
   - Importar las tablas utilizando el archivo `SQL PARA CREAR LA BASE Y TABLAS.txt`.

4. Configurar las variables de entorno en un archivo `.env`:

   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=trailerflix
   ```

5. Ejecutar el script para cargar los datos:

   - Ejecutar el script `utils/scriptCargarJson.js` para cargar los datos del archivo `trailerflix.json` a la base de datos automáticamente.

   ```bash
   node utils/scriptCargarJson.js
   ```

6. Iniciar el servidor:
   ```bash
   node .\app.js
   ```

## Uso

1. Para obtener todos los contenidos:

   ```http
   GET /contenido
   ```

2. Para obtener un contenido por ID:

   ```http
   GET /contenido/:id
   ```

3. Para filtrar contenidos por título, género o categoría:

   ```http
   GET /contenido?titulo=algo&genero=algo&categoria=algo
   ```

4. Para agregar un nuevo contenido:

   ```http
   POST /contenido
   Content-Type: application/json
   {
     "titulo": "Nuevo Título",
     "genero": "Género",
     "categoria": "Categoría",
     "resumen": "Resumen",
     "reparto": ["Actor 1", "Actor 2"]
   }
   ```

5. Para actualizar un contenido:

   ```http
   PUT /contenido/:id
   Content-Type: application/json
   {
     "titulo": "Título Actualizado"
   }
   ```

6. Para eliminar un contenido:
   ```http
   DELETE /contenido/:id
   ```

## Estructura del Proyecto

```plaintext
/controllers
  - contenidoController.js
/json
  - trailerflix.json
/README.md
/app.js
/conexion/
  - database.js
/models/
  - contenido.js
  - categoria.js
  - genero.js
  - actor.js
/routes/
  - contenidoRoutes.js
/utils/
   - scriptCargarJson.js
   - swagger.config.js
- app.js
- .gitignore
- README.md
```

## Endpoints

- GET /contenido: Obtener todos los contenidos.
- GET /contenido/
  : Obtener un contenido específico por ID.
- GET /contenido: Filtrar contenidos por título, género o categoría.
- POST /contenido: Agregar un nuevo contenido.
- PUT /contenido/
  : Actualizar un contenido existente.
- DELETE /contenido/
  : Eliminar un contenido.

## Dependencias

- cors: 2.8.5,
- express: 4.21.0.
- mysql2: 3.11.3.
- nodemon: 3.1.7.
- sequelize: 6.37.4.
- swagger-jsdoc: 6.2.8.
- swagger-ui-express: 5.0.1.

## Documentacion

- Puedes probar la API y todos sus endpoints accediendo a http://127.0.0.1:3000/api-docs/
- Tambien puedes probar la API desde POSTMAN con el archivo que se encuetra en la raiz del proyecto "POSTMAN CONFIG"
