const { sequelize } = require('./../db/db');
const { DataTypes } = require('sequelize');

var Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    short_description: {
        type: DataTypes.STRING,
        required: true
    },
    long_description: {
        type: DataTypes.STRING,
        required: true
    }
});

Category.sync();

module.exports = { Category };