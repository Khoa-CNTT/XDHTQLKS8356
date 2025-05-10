const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const { Booking_Services } = require('./booking_services');
const { Payment } = require('./payment');
const { Booking_Details } = require('./booking_details');

const Booking = sequelize.define("Booking",
    {
        checkin: DataTypes.DATEONLY,
        checkout: DataTypes.DATEONLY,
        adult_count : DataTypes.INTEGER,
        status: {
            type: DataTypes.TEXT,
            defaultValue : "booked"
        },
        type : DataTypes.TEXT,
        total_price : DataTypes.INTEGER
    },
    {
        tableName: "booking",
        timestamps : true
    }
);

//Booking_Services
Booking_Services.belongsTo(Booking);
Booking.hasMany(Booking_Services);


//Booking_Details
Booking_Details.belongsTo(Booking);
Booking.hasMany(Booking_Details);

//Payment
Payment.belongsTo(Booking);
Booking.hasMany(Payment);


module.exports = { Booking };