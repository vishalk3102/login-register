const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
// const User = require("./model/userSchema");

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`hello world from the server`);
});
app.get("/login", (req, res) => {
  res.send(`login page`);
});
app.get("/register", (req, res) => {
  res.send(`register page`);
});

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
