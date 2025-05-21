const {Payment} = require("../model/payment");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");

const createPayment = async (data) => {
    try {
        await Payment.create(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const getPayment = async (id) => {
    try {
        const Payment = await Payment.findAll();

        return Payment;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


module.exports = {createPayment, getPayment}