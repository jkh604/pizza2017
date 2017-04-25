var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbLink = require("./json/config.json");
var url = dbLink.dbServer.url;
MongoClient.connect(url,function(err, db) {
	assert.equal(null, err);
	var collection = db.collection('customers');
	collection.insert({name:"Kyle Harrison", pwd:"Moogle!123", phone:"7708651302"},
		function(err, result) {
				assert.equal(null, err);
				console.log("Success: " + result.insertedCount);
				db.close();
		});
});