// API Gateway Simple con Express
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const httpProxy = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Proxy configuration
const services = {
    '/api/reservas': 'http://localhost:3001',
    '/api/menus': 'http://localhost:3002',
    '/api/auth': 'http://localhost:3004'
};

// Crear proxies para cada servicio
Object.entries(services).forEach(([path, target]) => {
    app.use(path, httpProxy.createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${path}`]: path
        },
        onError: (err, req, res) => {
            console.error(`Error proxying to ${target}:`, err);
            res.status(503).json({ error: 'Service unavailable' });
        }
    }));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'api-gateway' });
});

app.listen(PORT, () => {
    console.log(`🚪 API Gateway running on port ${PORT}`);
});

module.exports = app;

