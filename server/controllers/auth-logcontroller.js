var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js');
var Log = sequelize.import('../models/log.js')

//POST
router.post('/', (req, res) => {
   const logFromRequest ={
       description: req.body.log.description,
       definition: req.body.log.definition,
       result: req.body.log.result,
       owner_id: req.body.log.owner_id
   }
   Log.create(logFromRequest)
       .then(log => res.status(200).json({
           log: log
       }))
       .catch(err => res.status(500).json({
           error: err
       }))
})

//get all logs

router.get('/', function(req, res){
    var userid = req.user.id;
    Log
        .findAll({
            where: { owner_id: userid }
        })
        .then (
            function findAllSuccess(data){
                res.json(data);
            },
            function findAllSError(err){
                res.send(500, err.message);
            }
        );
});

//get single log by id
router.get('/:id', function(req, res){
    var data = req.params.id;
    // var userid = req.user.id;
        Log
            .findOne({
                where: { id:data }
            })
            .then (
                function findOneSuccess(data){
                    res.json(data);
                },
                function findOneError(err){
                    res.send(500, err.message);
                }
            );
});


//UPDATE
router.put('/:id', (req,res)=>{
    var logPK = req.params.id;
    var updateData = req.body.log
    var userid = req.user.id;

   Log.update(updateData,
       {where: {id: logPK, owner_id: userid}
   })
   .then(log => res.status(200).json({updateData})
   )
.catch(err => res.status(500).json({
    error: err
}))
});

//DELETE
router.delete('/:id', (req,res)=>{
    var data = req.params.id
    var userid = req.user.id;
   Log.destroy({
       where: {
           id: data, owner_id: userid
       }
   })
   .then (
    function deleteLogSuccess(data){
        res.send("you removed a log");
    },
    function deleteLogError(err){
        res.send(500, err.message);
    }
);
});

module.exports = router;
