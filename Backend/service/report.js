const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");


// chưa sửa


//Doanh thu theo thời gian
const getReportTime = async (id, data) => {
    try {
        const sql = `WITH BookingRevenue AS (
                        SELECT
                            p.amount,
                            DATE(p.payment_date) AS payment_date
                        FROM 
                            payments p
                        JOIN 
                            booking b ON b.id = p."BookingId"
                        JOIN 
                            booking_detail bd ON b.id = bd."BookingId"
                        JOIN 
                            roomdetails rd ON rd.id = bd."RoomDetailId"
                        JOIN 
                            room r ON rd."RoomId" = r.id
                        WHERE
                            r."HotelId" = ${id}
                            AND p.payment_date BETWEEN ${data.start} AND ${data.end}
                        GROUP BY
                            p.id
                        ORDER BY 
                            p.payment_date
                    )
                    SELECT
                        payment_date,
                        SUM(amount) AS total_revenue
                    FROM
                        BookingRevenue
                    GROUP BY
                        payment_date
                    ORDER BY
                        payment_date;`

        const report = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        
        return report;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



//Doanh thu theo dịch vụ
const getReportService = async (id, data) => {
    try {
        const sql = `SELECT
                        s.service_name,
                        COALESCE(SUM(bs.total_price), 0) AS total_revenue
                    FROM 
                        services s
                    LEFT JOIN 
                        booking_services bs ON bs."ServiceId" = s.id
                    LEFT JOIN 
                        booking_detail bd ON bd.id = bs."BookingDetailId"
                    LEFT JOIN 
                        booking b ON bd."BookingId" = b.id
                    LEFT JOIN 
                        payments p ON p."BookingId" = b.id AND p.payment_date BETWEEN ${data.start} AND ${data.end} AND p.status = 'service'
                    JOIN 
                        hotel h ON h.id = s."HotelId"
                    WHERE
                        h.id = ${id}
                    GROUP BY
                        s.service_name;`

        const report = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        
        return report;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


//Doanh thu theo phòng
const getReportRoom = async (id, data) => {
    try {
        const sql = `SELECT
                        r.name AS room_name,
                        COALESCE(SUM(bd.price), 0) AS total_revenue
                    FROM 
                        room r
                    LEFT JOIN 
                        roomdetails rd ON rd."RoomId" = r.id
                    LEFT JOIN 
                        booking_detail bd ON rd.id = bd."RoomDetailId"
                    LEFT JOIN 
                        booking b ON b.id = bd."BookingId"
                    LEFT JOIN 
                        payments p ON p."BookingId" = b.id 
                                AND p.payment_date BETWEEN ${data.start} AND ${data.end}
                                AND p."status" = 'hotel'
                    WHERE
                        r."HotelId" = ${id}
                    GROUP BY
                        r.name;`

        const report = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        
        return report;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


module.exports = {getReportService, getReportRoom, getReportTime}