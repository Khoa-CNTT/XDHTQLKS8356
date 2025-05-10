const {Hotel} = require("../model/hotel");


const getHotel = async (id) => {
    try {
        const hotel = await Hotel.findByPk(1);
        return hotel;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const updateHotel = async (data) => {
    try {
        const hotel = await Hotel.findByPk(1);
        hotel.update(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}



module.exports = {getHotel, updateHotel}