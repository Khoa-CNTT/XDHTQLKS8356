const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Inventory = sequelize.define("Inventory",
    {
        status : DataTypes.TEXT
    },
    {
        tableName: "inventory",
        timestamps : true
    }
);


module.exports = { Inventory };