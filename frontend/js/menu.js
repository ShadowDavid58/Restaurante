// Manejo del menú
const Menu = {
    /**
     * Obtiene todos los items del menú
     */
    async getAll() {
        try {
            Utils.showLoader(true);
            
            const response = await api.get(
                CONFIG.ENDPOINTS.MENU.LIST,
                {},
                false // No requiere autenticación
            );

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Obtiene items por categoría
     */
    async getByCategory(category) {
        try {
            Utils.showLoader(true);
            
            const response = await api.get(
                CONFIG.ENDPOINTS.MENU.BY_CATEGORY,
                { category },
                false
            );

            Utils.showLoader(false);
            return response;
        } catch (error) {
            Utils.showLoader(false);
            throw error;
        }
    },

    /**
     * Renderiza un item del menú
     */
    renderMenuItem(item) {
        return `
            <div class="menu-item" data-category="${item.categoria}">
                <div class="menu-item__image"></div>
                <div class="menu-item__content">
                    <div class="menu-item__header">
                        <h3 class="menu-item__title">${Utils.sanitizeInput(item.nombre)}</h3>
                        <span class="menu-item__price">$${item.precio.toFixed(2)}</span>
                    </div>
                    <p class="menu-item__description">${Utils.sanitizeInput(item.descripcion || '')}</p>
                    <span class="menu-item__category">${Utils.sanitizeInput(item.categoria)}</span>
                </div>
            </div>
        `;
    },

    /**
     * Renderiza la lista de items del menú
     */
    async renderMenuItems(category = 'all') {
        const container = document.getElementById('menuItems');
        if (!container) return;

        try {
            let items;
            
            if (category === 'all') {
                items = await Menu.getAll();
            } else {
                items = await Menu.getByCategory(category);
            }

            if (!items || items.length === 0) {
                container.innerHTML = '<p>No hay items disponibles en esta categoría.</p>';
                return;
            }

            container.innerHTML = items
                .map(item => Menu.renderMenuItem(item))
                .join('');
        } catch (error) {
            console.error('Error loading menu:', error);
            container.innerHTML = '<p class="message message--error">Error al cargar el menú.</p>';
        }
    },

    /**
     * Maneja los filtros de categoría
     */
    handleFilters() {
        const filters = document.querySelectorAll('.btn--filter');
        
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remover active de todos
                filters.forEach(f => f.classList.remove('active'));
                
                // Agregar active al seleccionado
                filter.classList.add('active');
                
                // Obtener categoría
                const category = filter.getAttribute('data-category');
                
                // Renderizar items filtrados
                Menu.renderMenuItems(category);
            });
        });
    },

    /**
     * Inicializa el módulo del menú
     */
    init() {
        Menu.handleFilters();
        Menu.renderMenuItems();
    }
};

