// API Client - Manejo de peticiones HTTP
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * Obtiene el token de autenticación del localStorage
     */
    getAuthToken() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    }

    /**
     * Construye la URL completa del endpoint
     */
    buildURL(endpoint, params = {}) {
        let url = `${this.baseURL}${endpoint}`;
        
        // Reemplazar parámetros en la URL
        Object.keys(params).forEach(key => {
            url = url.replace(`:${key}`, params[key]);
        });
        
        return url;
    }

    /**
     * Construye los headers de la petición
     */
    buildHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (includeAuth) {
            const token = this.getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    }

    /**
     * Maneja errores de la respuesta
     */
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            const error = {
                status: response.status,
                statusText: response.statusText,
                message: data.message || data.error || 'Error en la petición',
                data: data
            };
            throw error;
        }

        return data;
    }

    /**
     * Realiza una petición GET
     */
    async get(endpoint, params = {}, includeAuth = true) {
        try {
            const url = this.buildURL(endpoint, params);
            const response = await fetch(url, {
                method: 'GET',
                headers: this.buildHeaders(includeAuth),
                signal: AbortSignal.timeout(CONFIG.REQUEST_TIMEOUT)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición POST
     */
    async post(endpoint, data = {}, params = {}, includeAuth = true) {
        try {
            const url = this.buildURL(endpoint, params);
            const response = await fetch(url, {
                method: 'POST',
                headers: this.buildHeaders(includeAuth),
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(CONFIG.REQUEST_TIMEOUT)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición PUT
     */
    async put(endpoint, data = {}, params = {}, includeAuth = true) {
        try {
            const url = this.buildURL(endpoint, params);
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.buildHeaders(includeAuth),
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(CONFIG.REQUEST_TIMEOUT)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición DELETE
     */
    async delete(endpoint, params = {}, includeAuth = true) {
        try {
            const url = this.buildURL(endpoint, params);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.buildHeaders(includeAuth),
                signal: AbortSignal.timeout(CONFIG.REQUEST_TIMEOUT)
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }
}

// Instancia global del API Client
const api = new ApiClient(CONFIG.API_BASE_URL);

