const {Room_Details} = require("../model/room_details");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");

const createRoomDetail = async (data) => {
    try {
        const check = await Room_Details.findOne({
            where : {
                room_number : data.room_number
            }
        });
    
        if(check){
            return -1;
        }
    
        await Room_Details.create(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const getRoomDetail = async (id) => {
    try {
        const sql = `SELECT
                        rd.room_number,
                        r.room_type AS room_name,
                        r.price_per_night
                    FROM 
                        room_details rd
                    JOIN 
                        room r ON rd.room_id = r.id
                    WHERE 
                        r.id = ${id}
                    ORDER BY rd.room_number`;
        
        const room = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

        return room;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const getAllRoomDetail = async (id) => {
    try {
        const sql = `SELECT
                        rd.id AS room_detail_id,
                        rd.room_number,
                        r.id as room_id,
                        r.room_type AS room_name,
                        r.price_per_night
                    FROM 
                        room_details rd
                    JOIN 
                        room r ON rd.room_id = r.id
                    ORDER BY rd.room_number`;
        
        const room = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

        return room;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const deleteRoomDetail = async (id) => {
    try {
        await Room_Details.destroy({
            where : {
                id : id
            }
        })
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const updateRoomDetail = async (id, data) => {
    try {
        const room = await Room_Details.findByPk(id);
        room.update(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

module.exports = {createRoomDetail, getRoomDetail, deleteRoomDetail, updateRoomDetail, getAllRoomDetail}