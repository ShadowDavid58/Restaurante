// Controller Layer
class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }

    async getAll(req, res) {
        try {
            const menus = await this.menusService.getAllMenus();
            res.json(menus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const menu = await this.menusService.getMenuById(req.params.id);
            res.json(menu);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByCategory(req, res) {
        try {
            const menus = await this.menusService.getMenusByCategory(req.params.category);
            res.json(menus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MenusController;

