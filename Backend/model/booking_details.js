const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Booking_Details = sequelize.define("Booking_Details",
    {
        price : DataTypes.INTEGER
    },
    {
        tableName: "booking_details"
    }
);


module.exports = { Booking_Details };