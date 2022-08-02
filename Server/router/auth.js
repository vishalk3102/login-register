const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`hello world`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, confirmpassword } = req.body;
  if (!name || !email || !phone || !password || !confirmpassword) {
    return res.status(422).json({ error: "please filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != confirmpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        password,
        confirmpassword,
      });

      const userRegister = await user.save();
      if (userRegister) {
        return res
          .status(201)
          .json({ message: "user registered successfully" });
      } else {
        return res.status(500).json({ error: "Failed to register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please filled the data proprly " });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.json({ message: "user successfully signin" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
    console.log(userLogin);
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", (req, res) => {
  res.send(req.rootUser);
});

module.exports = router;
