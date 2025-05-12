const Booking = require("../service/booking");

//Đặt phòng
const createBooking = async (req, res) => {
    let booking;
    if(req.user != null){
        booking = await Booking.createBooking(req.user.id, req.body);
    }
    else{
        booking = await Booking.createBooking(null, req.body);
    }
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



//Xem chi tiết đơn đặt phòng
const getBookingById = async (req, res) => {

    const booking = await Booking.getBookingById(req.params.id);

    if (booking == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Chi tiết đơn đặt phòng",
            booking
        })
    }
}

//Tất cả đặt phòng của khách sạn
const getAllBookingForAdmin = async (req, res) => {

    const booking = await Booking.getAllBookingForAdmin(req.query);

    if (booking == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Danh sách đơn đặt phòng",
            booking
        })
    }
}




//Tất cả đặt phòng của khách hàng
const getAllBookingForCustomer = async (req, res) => {

    const booking = await Booking.getAllBookingForCustomer(req.user.id);

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

//Huỷ đơn đặt phòng
const deleteBooking = async (req, res) => {

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

//chưa sửa 
//Cập nhật đơn đặt phòng
const updateBooking = async (req, res) => {

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

module.exports = {createBooking, getBookingById, getAllBookingForAdmin, getAllBookingForCustomer, deleteBooking, updateBooking}