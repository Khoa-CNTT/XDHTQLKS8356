const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Amenitie = sequelize.define("Amenitie",
    {
        name: DataTypes.STRING,
        price : DataTypes.INTEGER
    },
    {
        tableName: "amenitie"
    }
);


module.exports = { Amenitie };