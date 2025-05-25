const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");
const { User } = require('./user');

const History_Chat = sequelize.define("History_Chat",
    {
        message: DataTypes.STRING,
        sender : DataTypes.STRING,
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW")
        }
    },
    {
        tableName: "history_chat"
    }
);

//User
History_Chat.belongsTo(User);
User.hasMany(History_Chat);


module.exports = { History_Chat };