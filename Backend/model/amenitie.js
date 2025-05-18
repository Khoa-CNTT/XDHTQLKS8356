const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Amenitie = sequelize.define("Amenitie",
    {
        name: DataTypes.STRING,
        price : DataTypes.INTEGER,
        icon : DataTypes.STRING,
        image : DataTypes.STRING,
        type : DataTypes.STRING
    },
    {
        tableName: "amenitie"
    }
);


module.exports = { Amenitie };