const Report = require("../service/report");

const getReportService = async (req, res) => {

    const report = await Report.getReportService(req.query);

    res.status(201).json({
        status: true,
        message: "Báo cáo theo dịch vụ",
        report
    })

}


const getReportTime = async (req, res) => {
    const report = await Report.getReportTime(req.query);

    res.status(201).json({
        status: true,
        message: "Báo cáo theo thời gian",
        report
    })

}


const getReportRoom = async (req, res) => {
    const report = await Report.getReportRoom(req.query);

    res.status(201).json({
        status: true,
        message: "Báo cáo theo loại phòng",
        report
    })

}

module.exports = { getReportRoom, getReportTime, getReportService}