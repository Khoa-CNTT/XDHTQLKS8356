const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Messenger = sequelize.define("Messenger", 
    {
        messageContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        messageTime: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW")
        },
    },
    {
        tableName: "messenger"
    }
);


module.exports = { Messenger };