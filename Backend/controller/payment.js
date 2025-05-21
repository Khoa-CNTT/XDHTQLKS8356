const Payment = require("../service/payment");

const createPayment = async (req, res) => {

    await Payment.createPayment(req.body);

    res.status(201).json({
        status: true,
        message: "Thêm thanh toán thành công"
    })

}

module.exports = { createPayment}