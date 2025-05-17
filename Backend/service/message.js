const {Messenger} = require("../model/messenger");
const { Sequelize} = require("sequelize");
const { sequelize } = require("../config/mysql");


const sendMessage  = async (id, data) => {
    try {

        const messenger = await Messenger.create(data);

        return messenger;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getMessages  = async(a, b) => {
    if(id = 1){
        a = 1;
    }
    else{
        b = 1;
    }
    const message = await Messenger.findAll({
        where : {
            [Sequelize.Op.or] : [
                {sender_id : a, receiver_id : b},
                {sender_id : b, receiver_id : a}
            ]
        },
        order : [
            ["message_time", "DESC"]
        ]   
    })
    return message;

}


const getAllMessages  = async() => {
    const sql = `SELECT 
                    u.id AS user_id,
                    u.fullname,
                    u.image,
                    m.message_content,
                    m.message_time
                FROM (
                    SELECT 
                        CASE 
                            WHEN sender_id = 1 THEN receiver_id
                            ELSE sender_id
                        END AS other_user_id,
                        MAX(message_time) AS latest_time
                    FROM messenger
                    WHERE sender_id = 1 OR receiver_id = 1
                    GROUP BY other_user_id
                ) AS latest_messages
                JOIN messenger m 
                    ON ((m.sender_id = 1 AND m.receiver_id = latest_messages.other_user_id)
                        OR (m.receiver_id = 1 AND m.sender_id = latest_messages.other_user_id))
                    AND m.message_time = latest_messages.latest_time
                JOIN "user" u ON u.id = latest_messages.other_user_id
                ORDER BY m.message_time DESC;`

    const mess = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

    return mess;
}


const findMessage  = async() => {
    const sql = `SELECT DISTINCT 
                    u.id,
                    u.fullName,
                    u.picture,
                    MAX(m.messengerTime) AS lastMessageTime
                FROM messenger m
                JOIN user u ON (u.id = CASE 
                                        WHEN m.senderId = 4 THEN m.receiverId
                                        WHEN m.receiverId = 4 THEN m.senderId
                                    END)
                WHERE m.senderId = 4 OR m.receiverId = 4
                GROUP BY u.id, u.fullName, u.picture
                ORDER BY lastMessageTime DESC;`


    const order = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

    return order;
}


module.exports = {sendMessage, getMessages, getAllMessages, findMessage}