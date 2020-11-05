const axios = require('axios');
const Menu = require('./Menu');

class MenuCrawler {
    constructor() {
        this.menus = []
    }

    async getMenu(title) {
        console.log('Requesting menu: ', title)
        const titleLower = title.toLowerCase()
        if (!['a', 'b'].includes(titleLower)) {
            return
        }
        await this.fetchData()
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