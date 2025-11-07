// Repository Layer - Data Access
// Single Responsibility Principle: Solo maneja acceso a datos

const { Pool } = require('pg');

class ReservasRepository {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'restaurante_db',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres'
        });
    }

    async create(reserva) {
        const query = `
            INSERT INTO reservas (nombre, email, telefono, fecha, hora, num_personas, comentarios, estado)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [
            reserva.nombre,
            reserva.email,
            reserva.telefono,
            reserva.fecha,
            reserva.hora,
            reserva.num_personas,
            reserva.comentarios || null,
            reserva.estado || 'pending'
        ];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async findAll() {
        const query = 'SELECT * FROM reservas ORDER BY fecha DESC, hora DESC';
        const result = await this.pool.query(query);
        return result.rows;
    }

    async findById(id) {
        const query = 'SELECT * FROM reservas WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM reservas WHERE email = $1 ORDER BY fecha DESC';
        const result = await this.pool.query(query, [email]);
        return result.rows;
    }

    async update(id, reserva) {
        const query = `
            UPDATE reservas
            SET nombre = $1, email = $2, telefono = $3, fecha = $4, 
                hora = $5, num_personas = $6, comentarios = $7, estado = $8
            WHERE id = $9
            RETURNING *
        `;
        const values = [
            reserva.nombre,
            reserva.email,
            reserva.telefono,
            reserva.fecha,
            reserva.hora,
            reserva.num_personas,
            reserva.comentarios || null,
            reserva.estado || 'pending',
            id
        ];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'UPDATE reservas SET estado = $1 WHERE id = $2 RETURNING *';
        const result = await this.pool.query(query, ['cancelled', id]);
        return result.rows[0];
    }

    async checkAvailability(fecha, hora, numPersonas) {
        // Verificar cuántas reservas hay en esa fecha y hora
        const query = `
            SELECT SUM(num_personas) as total_personas
            FROM reservas
            WHERE fecha = $1 AND hora = $2 AND estado != 'cancelled'
        `;
        const result = await this.pool.query(query, [fecha, hora]);
        const totalPersonas = parseInt(result.rows[0].total_personas) || 0;
        
        // Asumimos capacidad máxima de 50 personas por hora
        const capacidadMaxima = 50;
        const disponible = (totalPersonas + numPersonas) <= capacidadMaxima;

        return {
            available: disponible,
            totalPersonas,
            capacidadMaxima,
            espaciosDisponibles: capacidadMaxima - totalPersonas
        };
    }

    async close() {
        await this.pool.end();
    }
}

module.exports = ReservasRepository;

