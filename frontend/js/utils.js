// Utilidades generales
const Utils = {
    /**
     * Muestra un mensaje al usuario
     */
    showMessage(elementId, message, type = 'success') {
        const messageEl = document.getElementById(elementId);
        if (!messageEl) return;

        messageEl.textContent = message;
        messageEl.className = `message message--${type} show`;
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 5000);
    },

    /**
     * Muestra/oculta el loader
     */
    showLoader(show = true) {
        const loader = document.getElementById('loader');
        if (loader) {
            if (show) {
                loader.classList.add('show');
            } else {
                loader.classList.remove('show');
            }
        }
    },

    /**
     * Formatea una fecha
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Formatea una hora
     */
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    },

    /**
     * Valida un email
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Valida un teléfono
     */
    validatePhone(phone) {
        const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        return re.test(phone);
    },

    /**
     * Obtiene la fecha mínima para el input date (hoy)
     */
    getMinDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    },

    /**
     * Obtiene la fecha máxima para el input date (30 días desde hoy)
     */
    getMaxDate() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return maxDate.toISOString().split('T')[0];
    },

    /**
     * Scroll suave a un elemento
     */
    scrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Sanitiza input para prevenir XSS
     */
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
};

