const uploadRouter = require("express").Router();
const upload = require("../config/cloudinary");
const {upImage} = require("../controller/upimage");


uploadRouter.post("/", upload.array("images", 100), upImage);


module.exports = uploadRouter;