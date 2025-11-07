// Controller Layer - HTTP Request/Response
// Single Responsibility Principle: Solo maneja HTTP

class ReservasController {
    constructor(reservasService) {
        this.reservasService = reservasService;
    }

    async create(req, res) {
        try {
            const reserva = await this.reservasService.createReserva(req.body);
            res.status(201).json(reserva);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const reservas = await this.reservasService.getAllReservas();
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const reserva = await this.reservasService.getReservaById(req.params.id);
            res.json(reserva);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const reserva = await this.reservasService.updateReserva(req.params.id, req.body);
            res.json(reserva);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const reserva = await this.reservasService.cancelReserva(req.params.id);
            res.json({ message: 'Reserva cancelada', reserva });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async checkAvailability(req, res) {
        try {
            const { fecha, hora, personas } = req.query;
            
            if (!fecha || !hora || !personas) {
                return res.status(400).json({ 
                    error: 'fecha, hora y personas son requeridos' 
                });
            }

            const availability = await this.reservasService.checkAvailability(
                fecha,
                hora,
                parseInt(personas)
            );

            res.json(availability);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ReservasController;

