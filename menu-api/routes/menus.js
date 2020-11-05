const express = require('express');
const MenuCrawler = require('../public/javascripts/MenuCrawler');
let router = express.Router();
let crawler = new MenuCrawler();

router.get('/menus/:menu', async function(req, res, next) {
  console.log('Requesting menu:', req.params.menu)
  res.json(crawler.getMenu())
});

module.exports = router;