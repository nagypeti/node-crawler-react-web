const express = require('express');
const MenuCrawler = require('../public/javascripts/MenuCrawler');
let router = express.Router();
let crawler = new MenuCrawler();

router.get('/menus/:menu', async function(req, res, next) {
  res.json(crawler.getMenu(req.params.menu))
});

module.exports = router;