const { Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:7252@localhost:5432/movies-list');


module.exports = { sequelize }