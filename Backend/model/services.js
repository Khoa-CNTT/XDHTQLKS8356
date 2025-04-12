const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Services = sequelize.define("Services",
    {
        service_name : DataTypes.TEXT,
        price : DataTypes.INTEGER,
    },
    {
        tableName: "services"
    }
);


module.exports = { Services };