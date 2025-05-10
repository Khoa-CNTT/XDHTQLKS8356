const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");
const { Pricing } = require('./pricing');
const { Amenitie } = require('./amenitie');
const { Room_Details } = require('./room_details');

const Room = sequelize.define("Room",
    {
        adult_count: DataTypes.INTEGER,
        room_type: DataTypes.TEXT,
        square_meters: DataTypes.INTEGER,
        price_per_night: DataTypes.INTEGER,
        image : DataTypes.STRING
    },
    {
        tableName: "room",
        timestamps : true
    }
);

//Pricing
Pricing.belongsTo(Room);
Room.hasMany(Pricing);




//Room_Details
Room_Details.belongsTo(Room);
Room.hasMany(Room_Details);

module.exports = { Room };