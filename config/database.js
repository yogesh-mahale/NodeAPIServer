const {Sequelize} = require('sequelize');

//Configure the ORM
var sequelize = new Sequelize('codegig', 'postgres', 'bonzer11', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
    protocol: 'postgres'
});

sequelize.sync({
    force: false,
    logging: console.log
}).then(function() {
    console.log('Database synchronized');
}).catch(function(err) {
    console.log(err)
});

module.exports = sequelize;