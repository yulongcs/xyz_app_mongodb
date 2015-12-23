var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/search', function(req, res,next) {
	console.log("sdfdsfsdfdsf")
  res.render('./pages/search/index', { title: '搜索' }); 
});

module.exports = router;
