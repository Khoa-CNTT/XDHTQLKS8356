const { Room } = require("../model/room");
const {find_room} = require("../helper/find_room");
const {convertData} = require("../helper/convertdata");
const { sequelize } = require("../config/mysql");
const { Sequelize, Op } = require("sequelize");
const { Room_Details } = require("../model/room_details");

//Gợi ý phòng
const suggestRooms = async (data) => {
    const sql = `WITH RECURSIVE DateRange AS (
                    SELECT DATE ${data.start} AS "date"
                    UNION ALL
                    SELECT ("date" + INTERVAL '1 day')::DATE
                    FROM DateRange
                    WHERE "date" < DATE ${data.end} - INTERVAL '1 day')

                SELECT 
                    r.id AS room_id,
                    rd.id AS room_detail_id,
                    r.room_type AS room_type, 
                    r.image,
                    r.adult_count,
                    SUM(
                        COALESCE(
                            (SELECT p.price FROM pricing p 
                            WHERE p.room_id = r.id AND d.date BETWEEN p.start_date AND p.end_date LIMIT 1), 
                            r.price_per_night
                        )
                    ) AS total_price
                FROM 
                    DateRange d
                CROSS JOIN 
                    room_details rd
                JOIN 
                    room r ON rd.room_id = r.id
                LEFT JOIN 
                    inventory i ON rd.id = i.room_detail_id
                            AND i.inventory_date BETWEEN  ${data.start} AND  ${data.end}
                WHERE
                    i.room_detail_id IS NULL AND r.adult_count <= ${data.people}
                GROUP BY 
                    rd.id, r.id, r.room_type
                ORDER BY
                    r.adult_count ASC;`;

    const room = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
    });
    
    console.log("a", find_room(room, data.people));

    return convertData(find_room(room, data.people));
};


//Trạng thái của phòng trong khách sạn
const getStatusRoom = async (data) => {
    try {

        // let select = "";

        // if (data.status) {
        //     select = "AND b.status IN" + data.status;
        // }

        const sql = `SELECT
                        b.id AS booking_id,
                        rd.room_number,
                        rd.id AS room_id,
                        u.fullname,
                        bd.id AS booking_detail_id,
                        CASE 
                            WHEN b.checkin < ${data.start} THEN ${data.start}
                            ELSE b.checkin
                        END AS checkin,
                        CASE 
                            WHEN b.checkout > ${data.end} THEN ${data.end}
                            ELSE b.checkout
                        END AS checkout,
                        b.status
                    FROM
                        booking b
                    JOIN
                        "user" u ON u.id = b.user_id
                    JOIN
                        booking_details bd ON bd.booking_id = b.id
                    JOIN
                        room_details rd ON rd.id = bd.room_detail_id
                    JOIN
                        room r ON r.id = rd.room_id
                    WHERE
                        b.checkin BETWEEN ${data.start} AND ${data.end}
                        OR b.checkout BETWEEN ${data.start} AND ${data.end}
                    ORDER BY
                        rd.room_number;`;

        const room = await sequelize.query(sql, {
            type: Sequelize.QueryTypes.SELECT,
        });

        return room;
    } catch (error) {
        console.log(error);
        return "error";
    }
};


const getRoomEmpty = async (data) => {
    try {
        const sql = `WITH RECURSIVE DateRange AS (
                        SELECT DATE ${data.start} AS "date"
                        UNION ALL
                        SELECT ("date" + INTERVAL '1 day')::DATE
                        FROM DateRange
                        WHERE "date" < DATE ${data.end} - INTERVAL '1 day'
                    )

                    SELECT
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                'room_id', r.id,
                                'count',
                                    (
                                        SELECT
                                            COUNT(rd.id)
                                        FROM
                                            room_details rd
                                        LEFT JOIN inventory i ON rd.id = i.room_detail_id
                                            AND i.inventory_date BETWEEN ${data.start} AND  ${data.end}
                                        WHERE
                                            rd.room_id = r.id
                                            AND i.room_detail_id IS NULL
                                    ),
                                'room_type', r.room_type,
                                'image', r.image,
                                'adult_count', r.adult_count,
                                'total_price', (
                                    SELECT SUM(
                                        COALESCE(
                                            (SELECT p.price FROM pricing p 
                                            WHERE p.room_id = r.id AND d.date BETWEEN p.start_date AND p.end_date LIMIT 1), 
                                            r.price_per_night
                                        )
                                    )
                                    FROM DateRange d
                                )
                            )
                        ) AS room_empty
                    FROM 
                        room_details rd
                    LEFT JOIN 
                        inventory i ON rd.id = i.room_detail_id AND i.inventory_date BETWEEN ${data.start} AND  ${data.end}
                    JOIN
                        room r ON r.id = rd.room_id
                    WHERE
                        i.room_detail_id IS NULL`;

        const room = await sequelize.query(sql, {
            type: Sequelize.QueryTypes.SELECT,
        });
        const suggest = await suggestRooms(data);
        
        return {room, suggest};
    } catch (error) {
        console.log(error);
        return "error";
    }
};



module.exports = {
    createRoom,
    getStatusRoom,
    getRoom,
    getRoomById,
    getRoomEmpty,
    deleteRoom,
    updateRoom
};
