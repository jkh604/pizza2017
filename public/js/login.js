var express = require('express')
, router = express.Router()

var db = require('../db')
var assert = require('assert')
var bodyParser = require("body-Parser");
router.use(bodyParser.urlencoded({
	extended:true
}));
router.use(bodyParser.json());

router.get('/login', function(req,res) {
	req.session.destroy();
	res.render('login',
		{"classM": "alert alert-danger", "msg":"Logged Out! Please come back :( "});
});

router.post('/checklogin', function(req, res) {
	var collection = db.getDb().collection('admin');
	var email = req.body.email;
	var pwd = req.body.password;
	var condition = `{"email": "${email}", "pwd": "${pwd}"}`;
	collection.find(JSON.parse(condition)).toArray(function(err,items) {
		assert.equal(null, err);
		if(items.length === 0)
			res.render('login', {
				"classM" : "alert alert-danger", "msg":"Login failed"
			});
		else
		{
			req.session.admin = true;
			req.session.user = email;
			res.redirect('/menu');
		}
	});
});
module.exports = router;