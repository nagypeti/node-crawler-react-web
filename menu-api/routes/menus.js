const express = require('express');
const router = express.Router();

const MenuCrawler = require('../public/javascripts/MenuCrawler');
const crawler = new MenuCrawler();

const ExpressCache = require('express-cache-middleware')
const cacheManager = require('cache-manager')

const cacheMiddleware = new ExpressCache(
  cacheManager.caching({
      store: 'memory', max: 10000, ttl: 3600
  })
)
cacheMiddleware.attach(router)

router.get('/menus/:menu', async function(req, res, next) {
  res.json(await crawler.getMenu(req.params.menu))
});

module.exports = router;