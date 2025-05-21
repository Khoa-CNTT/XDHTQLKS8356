const {Services} = require("../model/services");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");
const { Booking_Services } = require("../model/booking_services");

const createServices = async (data) => {
    try {
        
        const check = await Services.findOne({
            where : {
                service_name : data.service_name
            }
        });
    
        if(check){
            return -1;
        }
    
        await Services.create(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const getAllServices = async (id) => {
    try {
        const sql = `SELECT
                        s.id,
                        s.service_name,
                        s.price
                    FROM
                        services s`;
        
        const services = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

        return services;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const deleteServices = async (id) => {
    try {
        await Services.destroy({
            where : {
                id : id
            }
        })
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const updateServices = async (id, data) => {
    try {
        const check = await Services.findOne({
            where : {
               id : { [Op.ne]  : id},
               service_name : data.service_name 
            }
        })
        if(check){
            return -1;
        }
        const service = await Services.findByPk(id);
        service.update(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const bookingServices = async (data) => {
    try {
        await Booking_Services.bulkCreate(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

module.exports = {createServices, getAllServices, bookingServices, deleteServices, updateServices}