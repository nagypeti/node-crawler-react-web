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
        const url = 'https://millcantin.hu/termekkategoria/etlap/02-menuk';
        return await this.fetchData(url)
            .then(res => this.getMenuUrls(res))
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
}

module.exports = MenuCrawler;