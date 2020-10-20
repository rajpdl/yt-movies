const { Sequelize} = require('sequelize');

var sequelize = new Sequelize('postgres://postgres:7252@localhost:5432/movies-list');

module.exports = { sequelize }