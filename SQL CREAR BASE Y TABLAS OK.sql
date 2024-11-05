-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS trailerflix;
USE trailerflix;

-- Eliminar tablas si existen
DROP TABLE IF EXISTS contenido_actor;
DROP TABLE IF EXISTS contenido;
DROP TABLE IF EXISTS actores;
DROP TABLE IF EXISTS generos;
DROP TABLE IF EXISTS categorias;

-- Crear la tabla de categorías
CREATE TABLE categorias (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla de géneros
CREATE TABLE generos (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla de actores
CREATE TABLE actores (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla de contenido
CREATE TABLE contenido (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    poster VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    resumen TEXT NOT NULL,
    temporadas INT NOT NULL,
    trailer VARCHAR(255) NOT NULL,
    categoria_id BIGINT UNSIGNED NOT NULL,
    genero_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (genero_id) REFERENCES generos(id)
);

-- Crear la tabla de relación contenido-actor
CREATE TABLE contenido_actor (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    actor_id BIGINT UNSIGNED NOT NULL,
    contenido_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (actor_id) REFERENCES actores(id),
    FOREIGN KEY (contenido_id) REFERENCES contenido(id)
);

-- Crear índices para optimizar las consultas
ALTER TABLE contenido_actor ADD INDEX contenido_actor_actor_id_index (actor_id);
ALTER TABLE contenido_actor ADD INDEX contenido_actor_contenido_id_index (contenido_id);
ALTER TABLE contenido ADD INDEX contenido_categoria_id_index (categoria_id);
ALTER TABLE contenido ADD INDEX contenido_genero_id_index (genero_id);

-- Asegurarse de que las tablas de categorías y géneros tienen índices en los campos de nombre
ALTER TABLE categorias ADD INDEX categorias_nombre_index (nombre);
ALTER TABLE generos ADD INDEX generos_nombre_index (nombre);
ALTER TABLE actores ADD INDEX actores_nombre_index (nombre);