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


const loginUser = async (req, res) => {
    const user = await User.loginUser(req.body);
    if (user == -1) {
        res.status(404).json({
            success: false,
            message: "Không tìm thấy email"
        });
    }
    else if (user == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else if (user == -2) {
        res.status(404).json({
            success: false,
            message: "Sai mật khẩu"
        });
    }
    else {
        tokenCookie(user, 200, res);

    }
}

module.exports = {loginUser, getUser,  getAllUser, findUser, getAllUserGroup}