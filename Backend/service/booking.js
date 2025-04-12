const {Booking} = require("../model/booking");
const {Booking_Details} = require("../model/booking_details");
const {Hotel} = require("../model/hotel");
const {User} = require("../model/user");



const find_room = async (id, count, start, end) => {
    const sql = `SELECT 
                    rd.id
                FROM 
                    roomdetails rd
                JOIN 
                    room r ON rd."RoomId" = r.id
                WHERE 
                    r.id = ${id}
                    AND rd.id NOT IN (
                        SELECT 
                            "RoomDetailId"
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


const createBooking = async (data) => {
    try {
        //data.booking.user_id = id;
        if(data.type != "customer"){
            const user = await User.create(data.user_info);
            data.booking.user_id = user.id;
        }


        const booking = await Booking.create(data.booking);


    } catch (error) {
        console.log(error);
        return "error";
    }
}






module.exports = {createBooking}