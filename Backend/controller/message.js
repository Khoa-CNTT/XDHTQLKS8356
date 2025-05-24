const Message = require("../service/message");
const {io, getReceiverId} = require("../socket/socket");



const getMessages = async (req, res) => {
    const mess = await Message.getMessages(req.params.id);

    if (mess == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Tất cả tin nhắn",
            mess
        })
    }
}


const getAllMessages = async (req, res) => {

    const mess = await Message.getAllMessages();
    res.status(201).json({
        status: true,
        message: "Tất cả tin nhắn",
        mess
    })
}


const putMessage = async (req, res) => {
    await Message.putMessage(req.params.id, req.body);
    res.status(201).json({
        status: true,
        message: "Sửa tin nhắn thành công"
    })
}

module.exports = { getMessages, getAllMessages, putMessage}