const {Booking} = require("../model/booking");
const {Booking_Details} = require("../model/booking_details");
const {User} = require("../model/user");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");
const sendMail = require("../config/sendMail");


const find_room = async (id, count, start, end) => {
    const sql = `SELECT 
                    rd.id
                FROM 
                    room_details rd
                JOIN 
                    room r ON rd.room_id = r.id
                WHERE 
                    r.id = ${id}
                    AND rd.id NOT IN (
                        SELECT 
                            "room_detail_id"
                        FROM 
                            inventory
                        WHERE 
                            inventory_date BETWEEN '${start}' AND '${end}'
                    )
                ORDER BY 
                    rd.id ASC
                LIMIT ${count};`

    const list_room = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
    
    return list_room;
}

//Đặt phòng
const createBooking = async (id, data) => {
    try {
        data.booking.UserId = id;
        if(data.type != "customer"){
            const user = await User.create(data.user_info);
            data.booking.UserId = user.id;
        }


        const booking = await Booking.create(data.booking);

        const booking_detail = [];
        
        for(const value of data.booking_detail){
            const {price, RoomId, count} = value;

            
            const list_id = await find_room(RoomId, count, data.booking.checkin, data.booking.checkout);

            for (let i = 0; i < count; i++) {
                booking_detail.push({
                    price : price,
                    BookingId : booking.id,
                    RoomDetailId: list_id[i].id                   
                });
            }
        }

        await Booking_Details.bulkCreate(booking_detail);
        
        if(data.type == "guest"){
            const detail_booking = await getBookingById(booking.id);


            sendMail({
                email : data.user_info.email,
                subject : "Thông tin đơn đặt hàng của bạn",
                message : JSON.stringify(detail_booking)
            })
        }
        return booking
    } catch (error) {
        console.log(error);
        return "error";
    }
}


//Xem chi tiết đơn đặt phòng
const getBookingById = async (id) => {
    try {
        const sql = `SELECT 
                        b.id AS booking_id,
                        b."status" AS booking_status,
                        b.fullname,
                        b.phone,
                        b.created_at,
                        b.checkin,
                        b.checkout,
                        (b.checkout - b.checkin) AS total_day,
                        b.total_price AS total_price,
                        COALESCE(SUM(p.amount), 0) AS amount,
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                    'booking_detail_id', bd.id,
                                    'room_type', r.room_type,
                                    'room_number', rd.room_number,
                                    'price', bd.price
                                )
                            ) AS details,
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                    'service_name', s.service_name,
                                    'price', bs.price,
                                    'quantity', bs.quantity,
                                    'total_price', bs.total_price,
                                    'created_at', bs.created_at
                                )
                            ) AS services
                        
                    FROM 
                        booking b
                    JOIN 
                        "user" u ON u.id = b.user_id
                    LEFT JOIN 
                        payment p ON b.id = p.booking_id
                    JOIN 
                        booking_details bd ON bd.booking_id = b.id
                    LEFT JOIN 
                        booking_services bs ON bs.booking_id = b.id
                    LEFT JOIN 
                        services s ON s.id = bs.service_id
                    JOIN 
                        room_details rd ON rd.id = bd.room_detail_id
                    JOIN 
                        room r ON rd.room_id = r.id
                    WHERE
                        b.id = ${id}
                    GROUP BY
                        b.id, b."status", b.created_at, b.checkin, b.checkout;`

        const report = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        
        return report;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


//Tất cả đặt phòng của khách sạn
const getAllBookingForAdmin = async (data) => {
    try {
        const sql = `SELECT 
                        b.id AS booking_id,
                        b.fullname,
                        b.phone,
                        b."status" AS booking_status,
                        b.created_at,
                        b.checkin,
                        b.checkout,
                        b.type,
                        (b.checkout - b.checkin) AS total_day,
                        b.total_price AS total_price,
                        COALESCE(SUM(p.amount), 0) AS amount,
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                    'id', rd.id,
                                    'room_type', r.room_type,
                                    'room_number', rd.room_number,
                                    'price', bd.price
                                )
                            ) AS details,
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                    'service_name', s.service_name,
                                    'price', bs.price,
                                    'quantity', bs.quantity,
                                    'total_price', bs.total_price,
                                    'created_at', bs.created_at
                                )
                            ) AS services
                        
                    FROM 
                        booking b
                    LEFT JOIN 
                        "user" u ON u.id = b.user_id
                    LEFT JOIN 
                        payment p ON b.id = p.booking_id
                    JOIN 
                        booking_details bd ON bd.booking_id = b.id
                    LEFT JOIN 
                        booking_services bs ON bs.booking_id = b.id
                    LEFT JOIN 
                        services s ON s.id = bs.service_id
                    JOIN 
                        room_details rd ON rd.id = bd.room_detail_id
                    JOIN 
                        room r ON rd.room_id = r.id
                    WHERE
                        b.created_at BETWEEN ${data.start} AND ${data.end}
                    GROUP BY
                        b.id, b."status", b.created_at, b.checkin, b.checkout
                    ORDER BY
                        b.created_at;`

        const list_room = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        
        return list_room;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


//Tất cả đặt phòng của khách hàng
const getAllBookingForCustomer = async (id) => {
    try {
        const sql = `SELECT 
                        b.id AS booking_id,
                        b."status" AS booking_status,
                        b.created_at,
                        b.checkin,
                        b.checkout,
                        (b.checkout - b.checkin) AS total_day,
                        b.total_price AS total_price,
                        COALESCE(SUM(p.amount), 0) AS amount,
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                    'room_type', r.room_type,
                                    'room_number', rd.room_number,
                                    'price', bd.price
                                )
                            ) AS details,
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                    'service_name', s.service_name,
                                    'price', bs.price,
                                    'quantity', bs.quantity,
                                    'total_price', bs.total_price,
                                    'created_at', bs.created_at
                                )
                            ) AS services
                        
                    FROM 
                        booking b
                    LEFT JOIN 
                        "user" u ON u.id = b.user_id
                    LEFT JOIN 
                        payment p ON b.id = p.booking_id
                    JOIN 
                        booking_details bd ON bd.booking_id = b.id
                    LEFT JOIN 
                        booking_services bs ON bs.booking_id = b.id
                    LEFT JOIN 
                        services s ON s.id = bs.service_id
                    JOIN 
                        room_details rd ON rd.id = bd.room_detail_id
                    JOIN 
                        room r ON rd.room_id = r.id
                    WHERE
                        u.id = ${id}
                    GROUP BY
                        b.id, b."status", b.created_at, b.checkin, b.checkout
                    ORDER BY
                        b.created_at;`

        const list_room = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        
        return list_room;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



//Huỷ đơn đặt phòng
const deleteBooking = async (id) => {
    try {
        await Booking.destroy({
            where : {
                id : id
            }
        })
    } catch (error) {
        console.log(error);
        return "error";
    }
}


//Cập nhật đơn đặt phòng
const updateBooking = async (id, data) => {
    try {
        if(data.status == "cancelled"){
            const sql = `DELETE FROM inventory
                        USING room_details, booking_details, booking
                        WHERE inventory.room_detail_id = room_details.id
                        AND room_details.id = booking_details.room_detail_id
                        AND booking_details.booking_id = booking.id
                        AND booking.id = ${id};`
            await sequelize.query(sql, { type: Sequelize.QueryTypes.DELETE });
            await Booking_Details.destroy({
                where : {
                    booking_id : id
                }
            })
            await Booking.destroy({
                where : {
                    id : id
                }
            })
            return;
        }
        const booking = await Booking.findByPk(id);
        booking.update(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}



module.exports = {createBooking, getBookingById, getAllBookingForAdmin, getAllBookingForCustomer, deleteBooking, updateBooking}