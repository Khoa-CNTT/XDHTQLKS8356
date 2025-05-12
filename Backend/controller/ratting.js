const Ratting = require("../service/ratting");

const createRatting = async (req, res) => {
    await Ratting.createRatting(req.body);

    res.status(201).json({
        status: true,
        message: "Thành công"
    })

}

const getRatting = async (req, res) => {
    const ratting = await Ratting.getRatting(req.params.id);

    res.status(201).json({
        status: true,
        message: "Các đánh giá",
        ratting
    })

}



module.exports = { createRatting, getRatting}