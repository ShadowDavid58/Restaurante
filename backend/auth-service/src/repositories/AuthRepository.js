const { Pool } = require('pg');

class AuthRepository {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'restaurante_db',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres'
        });
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const result = await this.pool.query(query, [email]);
        return result.rows[0];
    }

    async create(user) {
        const query = `
            INSERT INTO usuarios (email, password_hash, nombre, telefono)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, nombre, telefono, created_at
        `;
        const values = [user.email, user.password_hash, user.nombre, user.telefono];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async findById(id) {
        const query = 'SELECT id, email, nombre, telefono, created_at FROM usuarios WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = AuthRepository;

