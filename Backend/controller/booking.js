const Booking = require("../service/booking");

const createBooking = async (req, res) => {

    const booking = await Booking.createBooking(req.body);

    if (booking == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Đặt phòng thành công",
            booking
        })
    }
}



module.exports = {createBooking}