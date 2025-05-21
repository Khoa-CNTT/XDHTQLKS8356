const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const { User } = require('./user');
const { Services } = require('./services');
const { Room } = require('./room');

const Hotel = sequelize.define("Hotel",
    {
        name: DataTypes.STRING,
        image : DataTypes.TEXT,
        description: DataTypes.TEXT,
        address: DataTypes.STRING,
        phone: DataTypes.STRING
    },
    {
        tableName: "hotel"
    }
);




//Services
Services.belongsTo(Hotel);
Hotel.hasMany(Services);

//Room
Room.belongsTo(Hotel);
Hotel.hasMany(Room);

module.exports = { Hotel };