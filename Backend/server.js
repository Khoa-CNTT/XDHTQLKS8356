const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true 
};



const {connectToDB} = require("./config/mysql.js");
const {app, server} = require("./socket/socket");




app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


//router
const customerRouter = require("./router/customer.js");
const adminRouter = require("./router/admin.js");
const uploadRouter = require("./router/upimage.js");


//api
app.use("/api/customer", customerRouter);
app.use("/api/admin", adminRouter);
app.use("/upload", uploadRouter);

server.listen(process.env.PORT, async () => {
	await connectToDB();
});