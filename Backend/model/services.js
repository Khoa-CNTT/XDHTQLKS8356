const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const { Booking_Services } = require('./booking_services');


const Services = sequelize.define("Services",
    {
        service_name : DataTypes.TEXT,
        price : DataTypes.INTEGER,
    },
    {
        tableName: "services"
    }
);


Booking_Services.belongsTo(Services);
Services.hasMany(Booking_Services);


module.exports = { Services };