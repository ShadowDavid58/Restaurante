// Microservicio de Autenticación
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const AuthController = require('./controllers/AuthController');
const AuthService = require('./services/AuthService');
const AuthRepository = require('./repositories/AuthRepository');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Inyección de dependencias
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'auth-service' });
});

// Rutas
app.post('/api/auth/login', (req, res) => authController.login(req, res));
app.post('/api/auth/register', (req, res) => authController.register(req, res));
app.get('/api/auth/me', (req, res) => authController.getMe(req, res));

app.listen(PORT, () => {
    console.log(`🔐 Auth Service running on port ${PORT}`);
});

module.exports = app;

