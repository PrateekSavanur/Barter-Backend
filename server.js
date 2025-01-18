const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const connectDB = require("./model/connectDB");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app on port ${port}`);
});

connectDB();

// Unhandled rejection handling

process.on("UnhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection ❌💥 Shutting down");
  // Complete all the requests and then end
  // server.close(() => {
  //   process.exit(1)
  // })
});

process.on("uncaughtException", (err) => {
  console.log(err.name);
  console.log("Uncaught Exception ❌💥 Shutting down.............");
  // Complete all the requests and then end
  // server.close(() => {
  //   process.exit(1)
  // })
});
