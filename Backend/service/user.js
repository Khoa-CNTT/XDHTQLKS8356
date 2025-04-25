const {User} = require("../model/user");
const { Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");
const {kmeans} = require('ml-kmeans');



const getUser  = async (id) => {
    const users = await User.findOne({
        where : {
            id : id
        }
    })
    return users;
    
}

const getAllUser  = async (id) => {
    const users = await User.findAll({
        where : {
            role : "guest"
        }
    })
    return users;
    
}

const getAllUserGroup  = async (id) => {
    const sql = `WITH tmp AS (
                    SELECT
                        b.id AS booking_id,
                        b.total_price,
                        u.id,
                        u.fullname
                    FROM
                        booking b
                    JOIN
                        "user" u ON b."UserId" = u.id
                    JOIN
                        booking_detail bd ON bd."BookingId" = b.id
                    JOIN
                        roomdetails rd ON rd.id = bd."RoomDetailId"
                    JOIN
                        room r ON r.id = rd."RoomId"
                    GROUP BY
                        b.id, u.id
                )
                SELECT
                COUNT(p.booking_id) AS total,
                SUM(p.total_price) AS price,
                p.id,
                p.fullname
                FROM
                    tmp p
                GROUP BY
                    p.id, p.fullname;`;

    const user = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

    const data = user.map(customer => [
        parseInt(customer.total),
        parseInt(customer.price),
    ]);

    //3 nhóm
    const result = kmeans(data, 3);

    user.forEach((user, index) => {
        user.cluster = result.clusters[index];
    });
    return user;
}


const findUser  = async (data) => {
    const search = `%${data}%`;


    const user = User.findAll({
        attributes : ["id", "fullName", "email", "picture"],
        where: {
            role : "customer",
            [Op.or]: [
              Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fullName')), {
                [Op.like]: search.toLowerCase()
              }),
              { email: { [Op.like]: search } }
            ]
        }
    })

    return user;
}


module.exports = {getUser, getAllUserGroup, findUser, getAllUser}