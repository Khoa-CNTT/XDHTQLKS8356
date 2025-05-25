const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const { Room } = require('./room');
const { Booking } = require('./booking');


const Ratting = sequelize.define("Ratting",
    {
        rate: DataTypes.INTEGER,
        image: DataTypes.STRING,
        create_at: {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.fn("NOW")
        },
        start : DataTypes.DATEONLY,
        end : DataTypes.DATEONLY
    },
    {
        tableName: "ratting"
    }
);



//Room
Ratting.belongsTo(Room);
Room.hasMany(Ratting);


//Booking
Ratting.belongsTo(Booking);
Booking.hasMany(Ratting);



module.exports = { Ratting };