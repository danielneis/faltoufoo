var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res) {

    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
        if(err) throw err;

        var collection = db.collection('test_insert');
        collection.insert({a:2}, function(err, docs) {

            collection.count(function(err, count) {
                console.log("count = ");
                console.log(count);
            });

            // Locate all the entries using find
            collection.find().toArray(function(err, results) {
                res.render('index', { results: results });
                // Let's close the db
                db.close();
            });
        });
    });
});

module.exports = router;
