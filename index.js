const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const jwtPassword = "aSdf125WER";

app.use(express.json());

const AllUsers = [
  {
    username: "rabi@gmail.com",
    password: "1234",
    name: "rabi majumder",
  },
  {
    username: "lamine@gmail.com",
    password: "2025",
    name: "lamine yamal",
  },
  {
    username: "hansi@gmail.com",
    password: "2024",
    name: "hansi flick",
  },
];

function checkUser(username, password) {
  for (let i = 0; i < AllUsers.length; i++) {
    if (AllUsers[i].username == username && AllUsers[i].password == password) {
      return true;
    }
  }
  return false;
}
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (checkUser(username, password) == false) {
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

app.get("/users", (req, res) => {
  var token = req.headers.authorization;
  try {
    const decode = jwt.verify(token, jwtPassword);
    const username = decode.username;
    res.json({
      users: AllUsers.filter((user) => {
        if (user.username != username) {
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
