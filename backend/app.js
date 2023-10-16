const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());

//to use cookie use cookie Parser
app.use(cookieParser());

//import routes
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1", user);
app.use("/api/v1", product);

// middleware for errors

app.use(errorMiddleware);

module.exports = app;
