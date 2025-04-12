const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Pricing = sequelize.define("Pricing",
    {
        start_date: DataTypes.DATEONLY,
        end_date: DataTypes.DATEONLY,
        price : DataTypes.INTEGER
    },
    {
        tableName: "pricing"
    }
);


module.exports = { Pricing };