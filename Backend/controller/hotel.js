const Hotel = require("../service/hotel");

const updateHotel = async (req, res) => {

    const hotel = await Hotel.updateHotel(req.body);

    if (hotel == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Sửa khách sạn thành công"
        })
    }

}


const getHotel = async (req, res) => {
    const hotel = await Hotel.getHotel();

    if (hotel == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Thông tin của khách sạn",
            hotel
        })
    }

}



module.exports = { updateHotel, getHotel}