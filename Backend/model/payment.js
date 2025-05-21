const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Payment = sequelize.define("Payment",
    {
        amount : DataTypes.INTEGER,
        type : DataTypes.TEXT,
        payment_gateway : DataTypes.TEXT
    },
    {
        tableName: "payment",
        timestamps : true
    }
);


module.exports = { Payment };