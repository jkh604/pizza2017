var express = require('express')
, router = express.Router()
var db = require('../db')
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require("body-Parser");
router.user(bodyParser.urlencoded({
	extended: true
}));
router.use(bodyParser.json());

router.post('/processOrders', function(req, res) {
	var info = [];
	var i = 0;
	var phone = req.body.phone;
	var itemIds = req.body.itemIds;
	var objids = [];
	for(item of itemIds)
		objids.push(ObjectId(item));
	var collectionO = db.getDb().collection('orders');
	var date = new Date();
	var collectionM = db.getDb().collection('menu');

	var orderItems = [];
	collectionM.find({"_id":{$in:objids}},
		{name: 1,price: 1,description: 1}).toArray(function(err, items) {
			collectionO.insert({"phone":phone,"items":items,"orderdBy":date});
		})
	res.send("Done!");
});
module.exports = router;