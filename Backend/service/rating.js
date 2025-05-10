const {Room_Details} = require("../model/room_details");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");

//chưa sửa
const createRating = async (data) => {
    try {   
        await Room_Details.create(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const getRating = async (id) => {
    try {
        const sql = `SELECT 
                        r.id,
                        rd.room_number,
                        r.name AS room_name,
                        r.price_per_night
                    FROM 
                        room r
                    JOIN 
                        hotel h ON r."HotelId" = h.id
                    JOIN 
                        roomdetails rd ON rd."RoomId" = r.id
                    ORDER BY rd.room_number`;
        
        const room = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

        return room;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



module.exports = {createRating, getRating}