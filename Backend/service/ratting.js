const {Ratting} = require("../model/ratting");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");

const createRatting = async (data) => {
    await Ratting.bulkCreate(data);
}

const getRatting = async (id) => {
    const sql = `SELECT
                    ra.rate,
                    ra.image,
                    ra.start,
                    ra.end,
                    ra.create_at,
                    r.room_type,
                    u.fullname,
                    u.image
                FROM
                    ratting ra
                JOIN 
                    room r ON r.id = ra.room_id
                JOIN
                    booking b ON b.id = ra.booking_id
                JOIN
                    "user" u ON u.id = b.user_id
                WHERE
	                r.id = ${id}
                ORDER BY
                    ra.create_at`;
        
    const ratting = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

    return ratting;
}



module.exports = {createRatting, getRatting}