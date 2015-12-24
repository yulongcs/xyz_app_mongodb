var express = require('express');
var router = express.Router();

/* GET sales page. */
router.get("/",function(req,res){ 
	res.render("./pages/sales/list",{title:'居家生活'});
});


/* GET sales new page. */
router.route("/new").get(function(req,res){
	res.render("./pages/sales/new",{title:'闲余卖'});
}).post(function(req,res){ 

});

/* GET sales detail page. */
router.route("/detail").get(function(req,res){
	res.render("./pages/sales/detail",{title:'商品名称'});
}).post(function(req,res){ 

});

module.exports = router;
