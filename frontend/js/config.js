// Configuración de la aplicación
const CONFIG = {
    // API Base URL - Cambiar según el entorno
    API_BASE_URL: 'http://localhost:8000/api',
    
    // Endpoints
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            LOGOUT: '/auth/logout',
            ME: '/auth/me'
        },
        RESERVATIONS: {
            CREATE: '/reservas',
            LIST: '/reservas',
            GET: '/reservas/:id',
            UPDATE: '/reservas/:id',
            DELETE: '/reservas/:id',
            AVAILABILITY: '/reservas/availability'
        },
        MENU: {
            LIST: '/menus',
            GET: '/menus/:id',
            BY_CATEGORY: '/menus/category/:category'
        }
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        TOKEN: 'auth_token',
        USER: 'user_data'
    },
    
    // Timeouts
    REQUEST_TIMEOUT: 10000, // 10 segundos
    
    // Pagination
    ITEMS_PER_PAGE: 10
};

