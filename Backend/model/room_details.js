const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const { Inventory } = require('./inventory');
const { Booking_Details } = require('./booking_details');

const Room_Details = sequelize.define("Room_Details",
    {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    },
    {
        tableName: "room_details"
    }
);


//Inventory
Inventory.belongsTo(Room_Details);
Room_Details.hasMany(Inventory);


//Booking_Details
Booking_Details.belongsTo(Room_Details);
Room_Details.hasMany(Booking_Details);

module.exports = { Room_Details };