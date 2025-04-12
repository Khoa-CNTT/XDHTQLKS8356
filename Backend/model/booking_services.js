const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Booking_Services = sequelize.define("Booking_Services",
    {
        quantity : DataTypes.INTEGER,
        price : DataTypes.INTEGER,
        total_price : DataTypes.INTEGER,
    },
    {
        tableName: "booking_services",
        timestamps : true
    }
);


module.exports = { Booking_Services };