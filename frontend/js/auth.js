// Manejo de autenticación
const Auth = {
    /**
     * Verifica si el usuario está autenticado
     */
    isAuthenticated() {
        return !!localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    },

    /**
     * Obtiene el usuario actual
     */
    getCurrentUser() {
        const userData = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Inicia sesión
     */
    async login(email, password) {
        try {
            Utils.showLoader(true);
            
            const response = await api.post(
                CONFIG.ENDPOINTS.AUTH.LOGIN,
                { email, password },
                {},
                false
            );

            // Guardar token y datos del usuario
            localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, response.token);
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(response.user));

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Cierra sesión
     */
    logout() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        window.location.reload();
    },

    /**
     * Maneja el formulario de login
     */
    handleLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (!loginForm) return;

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                Utils.showMessage('loginMessage', 'Por favor completa todos los campos', 'error');
                return;
            }

            if (!Utils.validateEmail(email)) {
                Utils.showMessage('loginMessage', 'Email inválido', 'error');
                return;
            }

            try {
                await Auth.login(email, password);
                Utils.showMessage('loginMessage', 'Inicio de sesión exitoso', 'success');
                
                // Cerrar modal después de 1 segundo
                setTimeout(() => {
                    const modal = document.getElementById('loginModal');
                    if (modal) {
                        modal.classList.remove('show');
                    }
                    window.location.reload();
                }, 1000);
            } catch (error) {
                const message = error.message || 'Error al iniciar sesión';
                Utils.showMessage('loginMessage', message, 'error');
            }
        });
    },

    /**
     * Inicializa los eventos de autenticación
     */
    init() {
        // Botón de login
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            if (Auth.isAuthenticated()) {
                loginBtn.textContent = 'Cerrar Sesión';
                loginBtn.addEventListener('click', () => {
                    Auth.logout();
                });
            } else {
                loginBtn.addEventListener('click', () => {
                    const modal = document.getElementById('loginModal');
                    if (modal) {
                        modal.classList.add('show');
                    }
                });
            }
        }

        // Cerrar modal
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                const modal = document.getElementById('loginModal');
                if (modal) {
                    modal.classList.remove('show');
                }
            });
        }

        // Cerrar modal al hacer clic fuera
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        }

        // Manejar formulario de login
        Auth.handleLoginForm();
    }
};

