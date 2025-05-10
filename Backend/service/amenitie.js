const {Amenitie} = require("../model/amenitie");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");

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


const getAmenitie = async (id) => {
    try {
        const amenitie = await Amenitie.findAll();

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
               id : { [Op.ne]  : id},
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

module.exports = {createAmenitie, getAmenitie, deleteAmenitie, updateAmenitie}