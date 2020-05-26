const Sequelize = require('sequelize');

const sequelize = new Sequelize('assignment-workoutlog', 'postgres', 'RomeoOhRomeo',{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('connected to postgres');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;