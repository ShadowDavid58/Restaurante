-- Script de inicialización de la base de datos PostgreSQL

-- Crear base de datos
CREATE DATABASE restaurante_db;

-- Conectar a la base de datos
\c restaurante_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    num_personas INTEGER NOT NULL,
    comentarios TEXT,
    estado VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_reservas_fecha ON reservas(fecha);
CREATE INDEX idx_reservas_email ON reservas(email);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Datos de ejemplo para usuarios (opcional)
-- Contraseña: "password123" (hash bcrypt)
INSERT INTO usuarios (email, password_hash, nombre, telefono) VALUES
('admin@restaurante.com', '$2b$10$rOzJ8Z8Z8Z8Z8Z8Z8Z8Z8O8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', 'Admin', '+1234567890')
ON CONFLICT (email) DO NOTHING;

-- Datos de ejemplo para menús (se insertarán en MongoDB)
-- Estos se insertan desde el servicio de menús

