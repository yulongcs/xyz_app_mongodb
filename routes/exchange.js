var express = require('express');
var router = express.Router();

/* GET exchange page. */
router.get("/exchange",function(req,res){ 
	res.render("./pages/exchange/list",{title:'交换'});
});


/* GET exchange new page. */
router.route("/exchange/new").get(function(req,res){
	res.render("./pages/exchange/new",{title:'交换'});
}).post(function(req,res){ 

});

/* GET exchange detail page. */
router.route("/exchange/detail").get(function(req,res){
	res.render("./pages/exchange/detail",{title:'交换'});
}).post(function(req,res){ 

});

module.exports = router;
