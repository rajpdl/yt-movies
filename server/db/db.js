const { Sequelize} = require('sequelize');

var url = 'postgres://postgres:7252@localhost:5432/movies-list' || process.env.DATABASE_URL ;

var sequelize = new Sequelize(url);

module.exports = { sequelize }