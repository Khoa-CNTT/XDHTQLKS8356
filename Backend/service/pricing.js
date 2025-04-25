const {Pricing} = require("../model/pricing");
const {Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");

const createPricing = async (data) => {
    try {
        const check = await Pricing.findOne({
            where : {
                name : data.name,
                RoomId : data.RoomId
            }
        });
    
        if(check){
            return -1;
        }
    
        await Pricing.create(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getPricing = async (id) => {
    try {
        const sql = `WITH price AS (
                        SELECT
                            p.id,
                            r.name,
                            p.start_date,
                            p.end_date,
                            p.price
                        FROM 
                            room r
                        JOIN 
                            pricing p ON p."RoomId" = r.id
                        GROUP BY 
                            p.id, r.name, p.start_date, p.end_date, p.price
                    )
                    SELECT 
                        p.name,
                        json_agg(
                            json_build_object(
                                'room_name', pr.name,
                                'start_date', pr.start_date,
                                'end_date', pr.end_date,
                                'price', pr.price,
                                'pricing_id', pr.id
                            )
                        ) AS details
                    FROM 
                        pricing p
                    JOIN 
                        price pr ON p.id = pr.id
                    GROUP BY
                        p.name;`;
        
        const pricing = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

        return pricing;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



const deletePricing = async (id) => {
    try {
        await Pricing.destroy({
            where : {
                id : id
            }
        })
    } catch (error) {
        console.log(error);
        return "error";
    }
}



const updatePricing = async (id, data) => {
    try {
        const price = await Pricing.findByPk(id);
        price.update(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}
module.exports = {createPricing, getPricing, deletePricing, updatePricing}