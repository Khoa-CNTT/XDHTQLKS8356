const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Inventory = sequelize.define("Inventory",
    {
        status: {
            type: DataTypes.TEXT,
            defaultValue : "booked"
        },
        inventory_date : DataTypes.DATE
    },
    {
        tableName: "inventory"
    }
);


module.exports = { Inventory };