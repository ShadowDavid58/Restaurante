// Service Layer - Business Logic
class MenusService {
    constructor(menusRepository) {
        this.menusRepository = menusRepository;
    }

    async getAllMenus() {
        return await this.menusRepository.findAll();
    }

    async getMenuById(id) {
        const menu = await this.menusRepository.findById(id);
        if (!menu) {
            throw new Error('Item del menú no encontrado');
        }
        return menu;
    }

    async getMenusByCategory(category) {
        return await this.menusRepository.findByCategory(category);
    }
}

module.exports = MenusService;

