const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Amenitie = sequelize.define("Amenitie",
    {
        name: DataTypes.STRING,
        icon : DataTypes.STRING,
        image : DataTypes.TEXT,
        type : DataTypes.STRING
    },
    {
        tableName: "amenitie"
    }
);

module.exports = { Amenitie };