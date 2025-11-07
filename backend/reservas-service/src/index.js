// Microservicio de Reservas
// Arquitectura: N-Tier (Controller-Service-Repository)

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const ReservasController = require('./controllers/ReservasController');
const ReservasService = require('./services/ReservasService');
const ReservasRepository = require('./repositories/ReservasRepository');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Inyección de dependencias (Dependency Inversion Principle)
const reservasRepository = new ReservasRepository();
const reservasService = new ReservasService(reservasRepository);
const reservasController = new ReservasController(reservasService);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'reservas-service' });
});

// Rutas
app.post('/api/reservas', (req, res) => reservasController.create(req, res));
app.get('/api/reservas', (req, res) => reservasController.getAll(req, res));
app.get('/api/reservas/:id', (req, res) => reservasController.getById(req, res));
app.put('/api/reservas/:id', (req, res) => reservasController.update(req, res));
app.delete('/api/reservas/:id', (req, res) => reservasController.delete(req, res));
app.get('/api/reservas/availability', (req, res) => reservasController.checkAvailability(req, res));

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Reservas Service running on port ${PORT}`);
});

module.exports = app;

