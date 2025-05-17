const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");
const bcryptjs = require("bcryptjs");
const { Booking } = require('./booking');
const { Conversation } = require('./conversation');
const { Messenger } = require('./messenger');

const User = sequelize.define("User",
    {
        fullname: DataTypes.TEXT,
        password: DataTypes.TEXT,
        email: DataTypes.TEXT,
        status: {
            type : DataTypes.TEXT,
            defaultValue : "account"
        },
        role : {
            type : DataTypes.TEXT,
            defaultValue : "customer"
        },
        phone: DataTypes.TEXT,
        image: {
            type: DataTypes.TEXT,
            defaultValue: "https://www.elevenforum.com/attachments/images-jpeg-2-jpg.45643/"
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn("NOW"),
        }
    },
    {
        tableName: "user"
    }
);



//Booking
Booking.belongsTo(User);
User.hasMany(Booking);

//Conversation
Conversation.belongsTo(User);
User.hasMany(Conversation);

//Messenger
Messenger.belongsTo(User);
User.hasMany(Messenger);


User.beforeCreate(async (user) => {
    if(user.password){
        const hashedPassword = await bcryptjs.hash(user.password, 10);
    user.password = hashedPassword;
    }
});


User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const hashedPassword = await bcryptjs.hash(user.password, 10);
        user.password = hashedPassword;
    }
})

module.exports = {User};