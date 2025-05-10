const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/mysql");
const { Booking } = require('./booking');
const { Inventory } = require('./inventory');
const { Room_Details } = require('./room_details');

const Booking_Details = sequelize.define("Booking_Details",
    {
        price : DataTypes.INTEGER
    },
    {
        tableName: "booking_details"
    }
);

//Booking
Booking_Details.belongsTo(Booking);
Booking.hasMany(Booking_Details);


//Room_Details
Booking_Details.belongsTo(Room_Details);
Room_Details.hasMany(Booking_Details);

Booking_Details.afterBulkCreate(async (data) => {

    const id = await Booking.findOne({
        where : {
            id : data[0].dataValues.BookingId
        },
        attributes : ["checkin", "checkout"]
    })


    const sum = (new Date(id.dataValues.checkout) - new Date(id.dataValues.checkin)) /(1000 * 3600 * 24);
    const checkinDate = new Date(id.dataValues.checkin);


    for(const booking of data){
        for(let i = 0; i<sum; i++){
            const day = new Date(checkinDate);
            day.setDate(checkinDate.getDate() + i);
            await Inventory.create({
                inventory_date : day,
                RoomDetailId : booking.dataValues.RoomDetailId
            })
        }
    }

});

module.exports = { Booking_Details };