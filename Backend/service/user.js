const {User} = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    const sql = `SELECT 
                    u.id,
                    u.fullname,
                    u.email,
                    u.image
                    FROM 
                    "user" u
                WHERE
                    u.fullname ILIKE '%${data}%'`;

    const user = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
    return user;
}


const registerUser = async (data) => {
    try {
        const check = await User.findOne({
            where : {
                email : data.email
            }
        });
    
        if(check){
            return -1;
        }
    
        const user = {
            fullname : data.fullname,
            email    : data.email,
            password : data.password,
            phone    : data.phone,
            role : "customer"
        }
    
        const token = activeToken(user);
        const otp = token.code;
        sendMail({
            email : data.email,
            subject : "Xác nhận đăng ký tài khoản",
            message : otp
        })
        return token;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const activeUser = async(data) => {
    try {
        const newUser = jwt.verify(data.token, process.env.JWT);
        if(newUser.code != data.code){
            return -1;
        } 
        await User.create(newUser.user)
    } catch (error) {
        console.log(error);
        return "error";
    }


}



const loginUser  = async (data) => {
    try {
        let user = await User.findOne({
            where : {
                email : data.email
            }
        })
        

        // if(!users){
        //     return -1;
        // }
        // else{
        //     const check = await bcryptjs.compare(data.password, users.password);
        //     if(!check){
        //         return -2;
        //     }
        //     else{
        //         return user;
        //     }

        // }

        return user;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



const putUser  = async (id, data) => {
    try {
        const user = await User.findByPk(id);
        if(data.password){
            const check = await bcryptjs.compare(data.password_old, user.password);
            if(check){
                user.update(data);
            }
            else{
                return -1;
            }
        }
        else{
            user.update(data);
        }
    } catch (error) {
        console.log(error);
    }
}


const addEmployee  = async (data) => {
    try {
        const check = await User.findOne({
            where : {
                email : data.email
            }
        });
    
        if(check){
            return -1;
        }
    
        await User.create(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUser, getAllUserGroup, findUser, getAllUser, registerUser, activeUser, loginUser, putUser, addEmployee}