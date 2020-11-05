const express = require('express');
let router = express.Router();

router.get('/menus/:menu', async function(req, res, next) {
  console.log('Requesting menu:', req.params.menu)
  res.json('test')
});

module.exports = router;