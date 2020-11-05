const Menu = require('./Menu');

class MenuCrawler {
    constructor() {
        this.menus = [];
    }

    getMenu() {
        return new Menu;
    }
}

module.exports = MenuCrawler;