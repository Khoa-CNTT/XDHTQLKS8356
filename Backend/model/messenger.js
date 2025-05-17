const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Messenger = sequelize.define("Messenger", 
    {
        messageContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status_user : {
            type: DataTypes.TEXT,
            defaultValue : "unread"
        },
        status_emp : {
            type: DataTypes.TEXT,
            defaultValue : "unread"
        },
        messageTime: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW")
        }
    },
    {
        tableName: "messenger"
    }
);


module.exports = { Messenger };