const User = require("../service/user");
const tokenCookie = require("../middleware/cookie");



const getUser = async (req, res) => {
    const user = await User.getUser(req.user.id);
    res.status(200).json({
        success: true,
        message: "Thông tin của người dùng",
        user
    });
}




const getAllUser = async (req, res) => {
    const user = await User.getAllUser(req.query.sort);
    res.status(200).json({
        success: true,
        message: "Danh sách người dùng",
        user
    });
}

const findUser = async (req, res) => {
    const user = await User.findUser(req.query.search);
    res.status(200).json({
        success: true,
        message: "Danh sách người dùng",
        user
    });
}


const getAllUserGroup = async (req, res) => {
    const user = await User.getAllUserGroup(req.params.id);
    res.status(200).json({
        success: true,
        message: "Danh sách người dùng",
        user
    });
}

module.exports = { registerUser, activeUser, loginUser, getUser, putUser, getAllUser, putUserForAdmin, findUser, getAllUserGroup }