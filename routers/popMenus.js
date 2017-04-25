var express = require('express')
, router = express.Router()

var db = require('../db.js');
router.get("/menu", function(req, res) {
	var collection = db.getDb().collection('menu');
	collection.find().toArray(function(err, docs)
	{
		res.render('menu', 
			{infoMenu: "Okay, try out first handlebar!"});
	})
});
module.exports = router;