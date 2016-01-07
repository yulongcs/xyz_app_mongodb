var express = require('express');
var router = express.Router();

/* GET buy page. */
router.get("/",function(req,res){ 
	res.render("./pages/buy/list",{title:'休闲余'});
});


/* GET buy new page. */
router.route("/new").get(function(req,res){
	res.render("./pages/buy/new",{title:'求购'});
}).post(function(req,res){ 

});

/* GET buy detail page. */
router.route("/detail").get(function(req,res){
	res.render("./pages/buy/detail",{title:'求购'});
}).post(function(req,res){ 

});

module.exports = router;
