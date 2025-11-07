// Microservicio de Menús
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const MenusController = require('./controllers/MenusController');
const MenusService = require('./services/MenusService');
const MenusRepository = require('./repositories/MenusRepository');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Inyección de dependencias
const menusRepository = new MenusRepository();
const menusService = new MenusService(menusRepository);
const menusController = new MenusController(menusService);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'menus-service' });
});

// Rutas
app.get('/api/menus', (req, res) => menusController.getAll(req, res));
app.get('/api/menus/:id', (req, res) => menusController.getById(req, res));
app.get('/api/menus/category/:category', (req, res) => menusController.getByCategory(req, res));

app.listen(PORT, () => {
    console.log(`🍽️ Menús Service running on port ${PORT}`);
});

module.exports = app;

