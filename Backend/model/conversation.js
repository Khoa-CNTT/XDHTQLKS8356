const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");
const { Messenger } = require('./messenger');

const Conversation = sequelize.define("Conversation",
    {
        conversation_list : DataTypes.STRING
    },
    {
        tableName: "conversation"
    }
);

Messenger.belongsTo(Conversation);
Conversation.hasMany(Messenger);

module.exports = { Conversation };