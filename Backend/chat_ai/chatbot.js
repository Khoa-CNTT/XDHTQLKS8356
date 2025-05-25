const { answers } = require('./chatFunctions');
const { History_Chat } = require('../model/historychat');

//file chính
const chatbot = async (userQuestion) => {
    const answer = await answers(userQuestion);
    return answer;
};


const bot = async (req, res) => {
    const ans = await chatbot(req.body.question);
    
    //tin nhắn đếnđến
    await History_Chat.create({message : req.body.question, sender : "user", UserId : req.user.id});

    await History_Chat.create({message : ans, sender : "bot", UserId : req.user.id});

    res.status(201).json({
        status: true,
        message: "Câu trả lời",
        ans
    })
}


const getchatbot = async (req, res) => {
    const chat = await History_Chat.findAll({
        where : {
            user_id : req.user.id
        },
        order: [['created_at', 'DESC']]
    })
    
    res.status(201).json({
        status: true,
        message: "Đoạn hội thoại",
        chat
    })
}
module.exports = {bot, getchatbot}
