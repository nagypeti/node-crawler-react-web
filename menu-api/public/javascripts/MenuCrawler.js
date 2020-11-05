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

        await this.getMenus()

        return this.menus.find(menu => {
            if (menu.title === titleLower) {
                console.log('Requested menu is:', menu)
                return menu
            }
        })
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
        console.log('Fetching data from:', url)
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
        console.log('Fetching menus from:', menuUrls)
        return menuUrls
    }

    getMenuData(res) {
        const $ = cheerio.load(res.data)
        const section = $('div.summary.entry-summary')
        const menu = new Menu()
        section.each(function () {
            menu.title = $(this).find('h1.product_title.entry-title').text().charAt(0).toLowerCase()
            menu.price = $(this).find('span.woocommerce-Price-amount.amount').first().text()

            const dishes = $(this).find('div.woocommerce-product-details__short-description')
            menu.soup = dishes.children('p:nth-child(2)').text().slice(6).replace('_', ' - ')
            if (menu.title == 'a') {
                menu.mainDish = dishes.children('p:nth-child(4)').text().split('\n').pop().slice(13);
            } else {
                menu.mainDish = dishes.children('p:nth-child(5)').text().slice(13)
            }

            console.log(menu)
        })
        return menu
    }
}

module.exports = MenuCrawler;