const {Amenitie} = require("../model/amenitie");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");
const { Room_Amenitie } = require("../model/room_amenitie");

const createAmenitie = async (data) => {
    try {
        const check = await Amenitie.findOne({
            where : {
                name : data.name
            }
        });
    
        if(check){
            return -1;
        }
    
        await Amenitie.create(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const createAmenitieRoom = async (data) => {
    try {
        await Room_Amenitie.bulkCreate(data.data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getAmenitie = async (data) => {
    try {
        let amenitie;
        if(data.room_id){
            const sql = `SELECT a.id, a.name, a.icon, a.image, a.type
                    FROM "Room_Amenitie" ra
                    JOIN room r ON r.id = ra.room_id
                    JOIN amenitie a ON a.id = ra.amenitie_id
                    WHERE a.type = 'room' AND ra.room_id = ${data.room_id};`
            amenitie = sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        }
        else{
            amenitie = await Amenitie.findAll({
                where :{
                    type : data.type
                }
            })
        }
        return amenitie;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const deleteAmenitie = async (id) => {
    try {
        await Amenitie.destroy({
            where : {
                id : id
            }
        })
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const updateAmenitie = async (id, data) => {
    try {
        const check = await Amenitie.findOne({
            where : {
               id : { [Op.ne]  : id},
               name : data.name 
            }
        })
        if(check){
            return -1;
        }
        const amenitie = await Amenitie.findByPk(id);
        amenitie.update(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

module.exports = {createAmenitie, getAmenitie, deleteAmenitie, updateAmenitie, createAmenitieRoom}