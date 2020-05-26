var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test.js');

router.get('/', function(req, res){
    res.send('test route');
});
/*test 1*/
router.post('/one', function(req, res){
    res.send('test 1');
});

/*Create Method*/
router.post('/two', function(req, res){
    let testData = "Test data for endpoint 2";

    TestModel
    .create({
        testdata: testData
    }).then(dataFromDatabase => {
        res.send("Test two went through")
    })
});

/*req.body*/
router.post('/three', function(req, res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    res.send("Test three went through")
    console.log("Test three went through")
});
/*crafting response*/
router.post('/four', function(req, res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(){
            res.send('Test 4 is done.');
        }
    );
});

/*sending the response*/
router.post('/five', function(req, res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(data){
            res.send(data);
        }
    );
});

/*JSON response*/
router.post('/six', function(req, res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata){
            res.json({
                testdata: testdata
        });
    }
    );
});

/*EROOR handling*/
router.post('/six', function(req, res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata){
            res.json({
                testdata: testdata
        });
    },
    function createError(err){
        res.send(500, err.message);
    }
    );
});

module.exports = router;