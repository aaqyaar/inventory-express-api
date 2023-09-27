const express = require("express");
const logger = require("morgan");
const { readdirSync} = require("fs")
const path = require("path")
const connect = require("./config/db")

require("dotenv").config();

connect(process.env.MONGO_URI)


const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

readdirSync(path.join(__dirname, "/routes"), { withFileTypes: true }).forEach(file => {
  const route = require(`./routes/${file.name}`)
  app.use("/api", route)
});

app.listen(process.env.PORT, () => {
  console.log(`🌏 Server is running on PORT ${process.env.PORT}`);
});
