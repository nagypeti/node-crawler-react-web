const axios = require('axios');
const Menu = require('./Menu');

class MenuCrawler {
    constructor() {
        this.menus = []
    }

    async getMenu() {
        await this.fetchData()
        return new Menu
    }

    async fetchData() {
        const url = 'https://millcantin.hu/termekkategoria/etlap/02-menuk';
        console.log('Fetching data from: ', url)
        const response = await axios(url).catch(err => console.log(err))

        if (response.status !== 200) {
            console.log('Error occurred while fetching data')
            return 'Error occurred while fetching data'
        }
        return response
    };
}

module.exports = MenuCrawler;