const app = require("./app");
const dotenv = require("dotenv");

//config env
dotenv.config({ path: "backend/config/config.env" });

//connecting db
const connectDatabase = require("./config/database");
connectDatabase();

//connecting server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is working in http://localhost:${process.env.PORT}`);
});

// Uncaught error handling
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(" Server is shuting down due to uncaught Error");

  server.close(() => {
    process.exit(1);
  });
});

// unhandled error rejection handle

process.on("unhandledRejection", (err) => {
  console.log(`error : ${err.message}`);
  console.log("Server shuting down due to unhandeled promise rejection ");

  server.close(() => {
    process.exit(1);
  });
});
