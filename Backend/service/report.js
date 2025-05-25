const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");




//Doanh thu theo thời gian
const getReportTime = async (data) => {
    try {
        const sql = `WITH BookingRevenue AS (
                        SELECT
                            p.amount,
                            DATE(p.created_at) AS payment_date
                        FROM 
                            payment p
                        WHERE
                            p.created_at BETWEEN  ${data.start} AND ${data.end}
                        GROUP BY
                            p.id
                        ORDER BY 
                            p.created_at
                        )
                    SELECT
                        payment_date,
                        COALESCE(SUM(amount), 0) AS total_revenue
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
const getReportService = async (data) => {
    try {
        const sql = `SELECT
                        s.service_name,
                        COALESCE(SUM(bs.total_price), 0) AS total_revenue
                    FROM 
                        services s
                    LEFT JOIN 
                        booking_services bs ON bs.service_id = s.id
                    LEFT JOIN 
                        booking b ON bs.booking_id = b.id
                    LEFT JOIN 
                        payment p ON p.booking_id = b.id AND p.created_at BETWEEN ${data.start} AND ${data.end} AND p.type = 'service'
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
const getReportRoom = async (data) => {
    try {
        const sql = `SELECT
                        r.room_type AS room_type,
                        COALESCE(SUM(bd.price), 0) AS total_revenue
                    FROM 
                        room r
                    LEFT JOIN 
                        room_details rd ON rd.room_id = r.id
                    LEFT JOIN 
                        booking_details bd ON rd.id = bd.room_detail_id
                    LEFT JOIN 
                        booking b ON b.id = bd.booking_id
                    LEFT JOIN 
                        payment p ON p.booking_id = b.id 
                        AND p.created_at BETWEEN  ${data.start} AND ${data.end}
                        AND p.type = 'hotel'
                    GROUP BY
                        r.room_type;`

        const report = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
        
        return report;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


module.exports = {getReportService, getReportRoom, getReportTime}