const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const jwtPassword = "aSdf125WER";

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Cohort2");

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.use(express.json());

async function checkUser(username, password) {
  const exist = await User.findOne({ email: username, password: password });
  if (exist) {
    return true;
  } else {
    return false;
  }
}
app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const exist = await User.findOne({ email: username });
  if (exist) {
    res.status(400).json({ msg: "user exist" });
    return;
  }

  const user = new User({ name: name, email: username, password: password });
  user
    .save()
    .then(() => {
      res.json({ msg: "successfully registered" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "error occured" });
    });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if ((await checkUser(username, password)) == false) {
    res.status(403).json({
      msg: "user does not exist",
    });
  } else {
    var token = jwt.sign({ username: username }, jwtPassword);
    res.json({
      token,
    });
  }
});

app.get("/users", async (req, res) => {
  var token = req.headers.authorization;
  try {
    const decode = jwt.verify(token, jwtPassword);
    const username = decode.username;

    const AllUsers = await User.find();

    res.json({
      users: AllUsers.filter((user) => {
        if (user.email != username) {
          return true;
        } else {
          return false;
        }
      }),
    });
  } catch {
    res.status(403).json({
      msg: "user not found",
    });
  }
});

app.listen(3000);
