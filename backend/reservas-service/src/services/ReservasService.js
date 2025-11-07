// Service Layer - Business Logic
// Single Responsibility Principle: Solo maneja lógica de negocio

class ReservasService {
    constructor(reservasRepository) {
        this.reservasRepository = reservasRepository;
    }

    async createReserva(reservaData) {
        // Validaciones de negocio
        this.validateReservaData(reservaData);

        // Verificar disponibilidad
        const availability = await this.reservasRepository.checkAvailability(
            reservaData.fecha,
            reservaData.hora,
            reservaData.num_personas
        );

        if (!availability.available) {
            throw new Error('No hay disponibilidad para esa fecha y hora');
        }

        // Crear reserva
        const reserva = await this.reservasRepository.create(reservaData);
        return reserva;
    }

    async getAllReservas() {
        return await this.reservasRepository.findAll();
    }

    async getReservaById(id) {
        const reserva = await this.reservasRepository.findById(id);
        if (!reserva) {
            throw new Error('Reserva no encontrada');
        }
        return reserva;
    }

    async updateReserva(id, reservaData) {
        // Verificar que existe
        await this.getReservaById(id);

        // Validar datos
        this.validateReservaData(reservaData);

        // Actualizar
        return await this.reservasRepository.update(id, reservaData);
    }

    async cancelReserva(id) {
        const reserva = await this.getReservaById(id);
        
        if (reserva.estado === 'cancelled') {
            throw new Error('La reserva ya está cancelada');
        }

        return await this.reservasRepository.delete(id);
    }

    async checkAvailability(fecha, hora, numPersonas) {
        return await this.reservasRepository.checkAvailability(fecha, hora, numPersonas);
    }

    // Validaciones de negocio
    validateReservaData(reservaData) {
        if (!reservaData.nombre || reservaData.nombre.trim().length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres');
        }

        if (!reservaData.email || !this.isValidEmail(reservaData.email)) {
            throw new Error('Email inválido');
        }

        if (!reservaData.telefono || !this.isValidPhone(reservaData.telefono)) {
            throw new Error('Teléfono inválido');
        }

        if (!reservaData.fecha) {
            throw new Error('La fecha es requerida');
        }

        if (!reservaData.hora) {
            throw new Error('La hora es requerida');
        }

        if (!reservaData.num_personas || reservaData.num_personas < 1) {
            throw new Error('El número de personas debe ser al menos 1');
        }

        // Validar que la fecha no sea en el pasado
        const fechaReserva = new Date(reservaData.fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaReserva < hoy) {
            throw new Error('No se pueden hacer reservas en el pasado');
        }
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    isValidPhone(phone) {
        const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        return re.test(phone);
    }
}

module.exports = ReservasService;

