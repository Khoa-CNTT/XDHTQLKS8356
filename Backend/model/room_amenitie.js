const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");
const { Amenitie } = require('./amenitie');
const { Room } = require('./room');


const Room_Amenitie = sequelize.define('Room_Amenitie',
    {
        room_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        amenitie_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        }
    },
    {
        tableName: 'Room_Amenitie'
    }
);

Room_Amenitie.belongsTo(Amenitie, { foreignKey: 'amenitie_id'});
Amenitie.hasMany(Room_Amenitie, { foreignKey: 'amenitie_id' });

Room_Amenitie.belongsTo(Room, { foreignKey: 'room_id'});
Room.hasMany(Room, { foreignKey: 'room_id' });


module.exports = { Room_Amenitie };