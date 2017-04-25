var express = require('express')
, router = express.Router()
var db = require('../db');

var bodyParser = require("body-Parser");
router.use(bodyParser,json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/signupServer', function(req,res) {
	var email = req.body.email;
	var pwd = req.body.pwd;

	var collection = db.getDb().collection('Users');
	var query = {"email": email};
	collection.find(query).toArray(function(err, docs) {
	if(docs.length === 0)
	{
		collection.insert({"email": email, "password": pwd}, function(err, result)
			{
				if(err == null)
					res.redirect("/");
				else
					res.render("/signup", {errmessage:"Database Error"});
			});
		res.redirect("/");
	}
	else
	{
		res.render("/signup", {errmessage:"Database Error"});
	}


	})
})

module.exports = router;