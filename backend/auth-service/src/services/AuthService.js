const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        this.jwtExpiry = process.env.JWT_EXPIRY || '24h';
    }

    async login(email, password) {
        const user = await this.authRepository.findByEmail(email);
        
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            this.jwtSecret,
            { expiresIn: this.jwtExpiry }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                telefono: user.telefono
            }
        };
    }

    async register(userData) {
        const existingUser = await this.authRepository.findByEmail(userData.email);
        
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        const password_hash = await bcrypt.hash(userData.password, 10);

        const user = await this.authRepository.create({
            email: userData.email,
            password_hash,
            nombre: userData.nombre,
            telefono: userData.telefono
        });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            this.jwtSecret,
            { expiresIn: this.jwtExpiry }
        );

        return {
            token,
            user
        };
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = AuthService;

