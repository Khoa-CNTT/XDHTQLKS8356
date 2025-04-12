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
        address: DataTypes.STRING
    },
    {
        tableName: "hotel"
    }
);

//User
User.belongsTo(Hotel);
Hotel.hasMany(User);


//Services
Services.belongsTo(Hotel);
Hotel.hasMany(Services);

//Room
Room.belongsTo(Hotel);
Hotel.hasMany(Room);

module.exports = { Hotel };