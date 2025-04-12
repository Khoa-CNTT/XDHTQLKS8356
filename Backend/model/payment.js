const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Payment = sequelize.define("Payment",
    {
        amount : DataTypes.INTEGER,
        status : DataTypes.TEXT,
        payment_gateway : DataTypes.TEXT
    },
    {
        tableName: "payment",
        timestamps : true
    }
);


module.exports = { Payment };