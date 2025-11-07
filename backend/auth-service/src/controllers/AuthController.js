class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: 'Email y contraseña son requeridos' });
            }

            const result = await this.authService.login(email, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async register(req, res) {
        try {
            const { email, password, nombre, telefono } = req.body;
            
            if (!email || !password || !nombre) {
                return res.status(400).json({ error: 'Email, contraseña y nombre son requeridos' });
            }

            const result = await this.authService.register({ email, password, nombre, telefono });
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMe(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({ error: 'Token requerido' });
            }

            const decoded = await this.authService.verifyToken(token);
            // Aquí podrías obtener más datos del usuario desde la BD
            res.json({ id: decoded.id, email: decoded.email });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;

