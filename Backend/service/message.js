const {Messenger} = require("../model/messenger");
const { Sequelize} = require("sequelize");
const { sequelize } = require("../config/mysql");




const getMessages  = async(id) => {
    const sql = `SELECT
                    u.fullname,
                    u.image,
                    m.message_content,
                    m.message_time
                FROM
                    conversation c
                JOIN
                    messenger m ON c.id = m.conversation_id
                JOIN 
                    "user" u ON u.id = m.user_id
                WHERE
                    c.id = ${id}
                ORDER BY
                    m.message_time DESC;`

    const mess = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

    return mess;
}


const getAllMessages  = async() => {
    const sql = `SELECT
                    u.fullname,
                    u.image,
                    m.message_content,
                    m.status_user,
                    m.status_emp,
                    m.message_time,
                    m.id
                FROM
                    conversation c
                JOIN 
                    "user" u ON u.id = c.user_id
                JOIN
                    messenger m ON c.id = m.conversation_id
                JOIN 
                    (SELECT
                        conversation_id,
                    MAX(message_time) AS latest_time
                    FROM messenger
                    GROUP BY conversation_id) AS latest ON m.conversation_id = latest.conversation_id AND m.message_time = latest.latest_time
                ORDER BY
                    m.message_time DESC;`

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



const putMessage  = async(id, data) => {
    const mess = await Messenger.findByPk(id);
    mess.update(data);
}


module.exports = {getMessages, getAllMessages, findMessage, putMessage}