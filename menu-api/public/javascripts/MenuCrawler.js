const axios = require('axios');
const cheerio = require('cheerio');
const Menu = require('./Menu');

class MenuCrawler {
    constructor() {
        this.menus = []
    }

    async getMenu(title) {
        const titleLower = title.toLowerCase()
        if (!['a', 'b'].includes(titleLower)) {
            return
        }

        return this.getMenus()
    }

    async getMenus() {
        const cantinUrl = 'https://millcantin.hu/termekkategoria/etlap/02-menuk';
        const menuUrls = await this.fetchData(cantinUrl).then(res => this.getMenuUrls(res))
        for (const url of menuUrls) {
            await this.fetchData(url)
                .then(res => this.getMenuData(res))
                .then(menu => { this.menus.push(menu) })
        }
    }

    async fetchData(url) {
        console.log('Fetching data from: ', url)
        const response = await axios(url).catch(err => console.log(err))

        if (response.status !== 200) {
            console.log('Error occurred while fetching data')
            return 'Error occurred while fetching data'
        }
        return response
    };

    getMenuUrls(res) {
        const $ = cheerio.load(res.data)
        const section = $('a.product-image')
        const menuUrls = []
        section.each(function () {
            menuUrls.push(($(this).attr('href')))
        })
        console.log('Fetching menus from: ', menuUrls)
        return menuUrls
    }

    getMenuData(res) {
        const $ = cheerio.load(res.data)
        const section = $('div.summary.entry-summary')
        const menu = new Menu()
        section.each(function () {
            menu.title = $(this).find('h1.product_title.entry-title').text()
            console.log(menu)
        })
        return menu
    }
}

module.exports = MenuCrawler;