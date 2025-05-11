const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const { Inventory } = require('./inventory');


const Room_Details = sequelize.define("Room_Details",
    {
        room_number: DataTypes.STRING,
        description: DataTypes.STRING
    },
    {
        tableName: "room_details"
    }
);


//Inventory
Inventory.belongsTo(Room_Details);
Room_Details.hasMany(Inventory);




module.exports = { Room_Details };