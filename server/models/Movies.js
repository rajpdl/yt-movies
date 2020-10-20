const { sequelize } = require('./../db/db');
const { DataTypes } = require('sequelize');

var Movies = sequelize.define('Movies', {
    url : {
        type: DataTypes.STRING,
        required: true
    },
    title: {
        type: DataTypes.STRING,
        required: true
    },
    description: {
        type: DataTypes.STRING,
        required: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        required: true
    }
});

Movies.sync();

module.exports = { Movies };