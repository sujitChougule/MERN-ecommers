const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

app.use(express.json());

//config env
dotenv.config({ path: "backend/config/config.env" });

//to use cookie use cookie Parser
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//import routes
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// middleware for errors

app.use(errorMiddleware);

module.exports = app;
