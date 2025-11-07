// Manejo de reservas
const Reservations = {
    /**
     * Crea una nueva reserva
     */
    async create(reservationData) {
        try {
            Utils.showLoader(true);
            
            const response = await api.post(
                CONFIG.ENDPOINTS.RESERVATIONS.CREATE,
                reservationData
            );

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Obtiene todas las reservas del usuario
     */
    async getAll() {
        try {
            Utils.showLoader(true);
            
            const response = await api.get(
                CONFIG.ENDPOINTS.RESERVATIONS.LIST
            );

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Obtiene una reserva por ID
     */
    async getById(id) {
        try {
            Utils.showLoader(true);
            
            const response = await api.get(
                CONFIG.ENDPOINTS.RESERVATIONS.GET,
                { id }
            );

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Actualiza una reserva
     */
    async update(id, reservationData) {
        try {
            Utils.showLoader(true);
            
            const response = await api.put(
                CONFIG.ENDPOINTS.RESERVATIONS.UPDATE,
                reservationData,
                { id }
            );

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Cancela una reserva
     */
    async cancel(id) {
        try {
            Utils.showLoader(true);
            
            const response = await api.delete(
                CONFIG.ENDPOINTS.RESERVATIONS.DELETE,
                { id }
            );

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Verifica disponibilidad
     */
    async checkAvailability(fecha, hora, personas) {
        try {
            const response = await api.get(
                CONFIG.ENDPOINTS.RESERVATIONS.AVAILABILITY,
                {},
                false
            );
            
            // Enviar parámetros como query string
            const url = `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RESERVATIONS.AVAILABILITY}?fecha=${fecha}&hora=${hora}&personas=${personas}`;
            const res = await fetch(url, {
                headers: api.buildHeaders(false)
            });
            
            return await res.json();
        } catch (error) {
            console.error('Error checking availability:', error);
            return { available: true }; // Por defecto asumimos disponible
        }
    },

    /**
     * Renderiza una reserva en el DOM
     */
    renderReservation(reservation) {
        const statusClass = `reservation-card__status--${reservation.estado || 'pending'}`;
        const statusText = {
            'confirmed': 'Confirmada',
            'pending': 'Pendiente',
            'cancelled': 'Cancelada'
        }[reservation.estado] || 'Pendiente';

        return `
            <div class="reservation-card" data-id="${reservation.id}">
                <div class="reservation-card__header">
                    <h3 class="reservation-card__title">Reserva #${reservation.id}</h3>
                    <span class="reservation-card__status ${statusClass}">${statusText}</span>
                </div>
                <div class="reservation-card__info">
                    <div class="reservation-card__detail">
                        <span class="reservation-card__label">Fecha</span>
                        <span class="reservation-card__value">${Utils.formatDate(reservation.fecha)}</span>
                    </div>
                    <div class="reservation-card__detail">
                        <span class="reservation-card__label">Hora</span>
                        <span class="reservation-card__value">${Utils.formatTime(reservation.hora)}</span>
                    </div>
                    <div class="reservation-card__detail">
                        <span class="reservation-card__label">Personas</span>
                        <span class="reservation-card__value">${reservation.num_personas}</span>
                    </div>
                </div>
                ${reservation.comentarios ? `
                    <div class="reservation-card__detail">
                        <span class="reservation-card__label">Comentarios</span>
                        <span class="reservation-card__value">${Utils.sanitizeInput(reservation.comentarios)}</span>
                    </div>
                ` : ''}
                ${reservation.estado !== 'cancelled' ? `
                    <button class="btn btn--secondary" onclick="Reservations.handleCancel(${reservation.id})">
                        Cancelar Reserva
                    </button>
                ` : ''}
            </div>
        `;
    },

    /**
     * Renderiza la lista de reservas
     */
    async renderReservationsList() {
        const container = document.getElementById('reservationsList');
        if (!container) return;

        try {
            const reservations = await Reservations.getAll();
            
            if (!reservations || reservations.length === 0) {
                container.innerHTML = '<p>No tienes reservas aún.</p>';
                return;
            }

            container.innerHTML = reservations
                .map(reservation => Reservations.renderReservation(reservation))
                .join('');
        } catch (error) {
            console.error('Error loading reservations:', error);
            container.innerHTML = '<p class="message message--error">Error al cargar las reservas.</p>';
        }
    },

    /**
     * Maneja la cancelación de una reserva
     */
    async handleCancel(id) {
        if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            return;
        }

        try {
            await Reservations.cancel(id);
            Utils.showMessage('reservationMessage', 'Reserva cancelada exitosamente', 'success');
            Reservations.renderReservationsList();
        } catch (error) {
            Utils.showMessage('reservationMessage', error.message || 'Error al cancelar la reserva', 'error');
        }
    },

    /**
     * Maneja el formulario de reserva
     */
    handleReservationForm() {
        const form = document.getElementById('reservationForm');
        if (!form) return;

        // Configurar fecha mínima y máxima
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            fechaInput.min = Utils.getMinDate();
            fechaInput.max = Utils.getMaxDate();
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const reservationData = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                telefono: formData.get('telefono'),
                fecha: formData.get('fecha'),
                hora: formData.get('hora'),
                num_personas: parseInt(formData.get('personas')),
                comentarios: formData.get('comentarios') || null
            };

            // Validaciones
            if (!Utils.validateEmail(reservationData.email)) {
                Utils.showMessage('reservationMessage', 'Email inválido', 'error');
                return;
            }

            if (!Utils.validatePhone(reservationData.telefono)) {
                Utils.showMessage('reservationMessage', 'Teléfono inválido', 'error');
                return;
            }

            try {
                // Verificar disponibilidad
                const availability = await Reservations.checkAvailability(
                    reservationData.fecha,
                    reservationData.hora,
                    reservationData.num_personas
                );

                if (!availability.available) {
                    Utils.showMessage('reservationMessage', 'No hay disponibilidad para esa fecha y hora', 'error');
                    return;
                }

                // Crear reserva
                const response = await Reservations.create(reservationData);
                
                Utils.showMessage('reservationMessage', 'Reserva creada exitosamente', 'success');
                form.reset();
                
                // Recargar lista de reservas si el usuario está autenticado
                if (Auth.isAuthenticated()) {
                    setTimeout(() => {
                        Reservations.renderReservationsList();
                    }, 1000);
                }
            } catch (error) {
                const message = error.message || 'Error al crear la reserva';
                Utils.showMessage('reservationMessage', message, 'error');
            }
        });
    },

    /**
     * Inicializa el módulo de reservas
     */
    init() {
        Reservations.handleReservationForm();
        
        // Cargar reservas si el usuario está autenticado
        if (Auth.isAuthenticated()) {
            Reservations.renderReservationsList();
        }
    }
};

