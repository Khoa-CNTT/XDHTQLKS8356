const Amenitie = require("../service/amenitie");

const createAmenitie = async (req, res) => {

    const amenitie = await Amenitie.createAmenitie(req.body);

    if (amenitie == -1) {
        res.status(404).json({
            status: false,
            message: "Tên tiện ích đã tồn tại"
        })
    }
    else if (amenitie == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Thêm tiện ích sạn thành công"
        })
    }

}


const createAmenitieRoom = async (req, res) => {

    await Amenitie.createAmenitieRoom(req.body);

    res.status(201).json({
        status: true,
        message: "Thêm tiện ích sạn thành công"
    })

}


const getAmenitie = async (req, res) => {

    const amenitie = await Amenitie.getAmenitie(req.query);

    if (amenitie == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Danh sách tiện ích",
            amenitie
        })
    }

}

const updateAmenitie = async (req, res) => {

    const amenitie = await Amenitie.updateAmenitie(req.params.id, req.body);

    if (amenitie == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    if (amenitie == -1) {
        res.status(400).json("Tên tiện ích đã tồn tại");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Cập nhật thành công"
        })
    }

}

const deleteAmenitie = async (req, res) => {

    const amenitie = await Amenitie.deleteAmenitie(req.params.id);

    if (amenitie == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Xóa thành công"
        })
    }

}

module.exports = { createAmenitie, getAmenitie, updateAmenitie, deleteAmenitie, createAmenitieRoom}