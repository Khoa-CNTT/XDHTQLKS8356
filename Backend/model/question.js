const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");

const Question = sequelize.define("Question",
    {
        content: DataTypes.STRING,
        text : DataTypes.STRING
    },
    {
        tableName: "question"
    }
);

module.exports = { Question };