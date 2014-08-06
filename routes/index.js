var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res) {

    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
        if(err) throw err;

        var collection = db.collection('faltas');

        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
            db.close();
            res.render('index', { results: results });
        });
    });
});

router.put('/add', function(req, res) {

    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
        if(err) throw err;

        var collection = db.collection('faltas');
        collection.insert({lat: req.body.lat, lon: req.body.lon}, function(err, docs) {
            console.log(docs);
            db.close();
            res.send('');
        });
    });

});

module.exports = router;
