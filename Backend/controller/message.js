const Message = require("../service/message");
const {io, getReceiverId} = require("../socket/socket");

const sendMess = async (req, res) => {
    req.body.receiver_id = req.params.id;

    if(req.params.id == 1){
        req.body.sender_id = req.user.id;
    }
    else{
        req.body.sender_id = 1;
    }
    const mess = await Message.sendMessage(req.params.id, req.body);

    const id = getReceiverId(req.params.id);

    //Nếu đang online
    if(id){
        io.to(id).emit("new", mess);
    }

    if (mess == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Gửi thành công"
        })
    }

}


const getMessages = async (req, res) => {
    const mess = await Message.getMessages(req.params.id, req.user.id);

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


module.exports = { sendMess, getMessages, getAllMessages}