const RoomDetail = require("../service/room_detail");

const createRoomDetail = async (req, res) => {

    const room = await RoomDetail.createRoomDetail(req.body);

    if (room == -1) {
        res.status(404).json({
            status: false,
            message: "Tên phòng khách sạn đã tồn tại"
        })
    }
    else if (room == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Thêm phòng khách sạn thành công"
        })
    }

}

//Xem tất cả phòng theo loại 
const getRoomDetail = async (req, res) => {

    const room = await RoomDetail.getRoomDetail(req.params.id);

    if (room == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Danh sách phòng",
            room
        })
    }

}

//Xem tất cả phòng theo loại 
const getAllRoomDetail = async (req, res) => {

    const room = await RoomDetail.getAllRoomDetail();

    if (room == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Danh sách phòng",
            room
        })
    }

}

const updateRoomDetail = async (req, res) => {

    const room = await RoomDetail.updateRoomDetail(req.params.id, req.body);

    if (room == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Cập nhật thành công"
        })
    }

}

const deleteRoomDetail = async (req, res) => {

    const room = await RoomDetail.deleteRoomDetail(req.params.id);

    if (room == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Xóa nhật thành công"
        })
    }

}

module.exports = { createRoomDetail, getRoomDetail, updateRoomDetail, deleteRoomDetail, getAllRoomDetail}