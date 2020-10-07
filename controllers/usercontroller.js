const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let validateSession = require("../middleware/validate-session");

// Endpoints
// POST:  http://localhost:3025/user/register
// POST:  http://localhost:3025/user/login
// PUT :  http://localhost:3025/user/
// DEL :  http://localhost:3025/user/
// GET :  http://localhost:3025/user/

// -----  User Register  -----
// POST:  http://localhost:3025/user/register
router.post("/register", (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // password: req.body.password
    password: bcrypt.hashSync(req.body.password, 11),
    role: req.body.role,
  })
    .then((user) => {
      let token = jwt.sign({ id: user.id }, process.env.SECRETKEY, {
        expiresIn: "1d",
      });
      res.json({
        user: user,
        message: "You've created a profile!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  User Login  -----
// POST:  http://localhost:3025/user/login
router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(
    (user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.SECRETKEY, {
              expiresIn: "1d",
            });
            res.status(200).json({
              user: user,
              message: "Successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Bad Gateway" });
          }
        });
      } else {
        res.status(500).send({ error: "User does not exist" });
      }
    },
    (err) => res.status(501).send({ error: "Failed to Process" })
  );
});

// -----  Update User  -----
// PUT :  http://localhost:3025/user/
router.put("/", validateSession, (req, res) => {
  let userid = req.user.id;

  const updateUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  if (req.body.password != "") {
    updateUser.password = bcrypt.hashSync(req.body.password, 11);
    console.log(req.body.password);
  }
  const query = { where: { id: userid } };
  User.update(updateUser, query)
    .then((user) =>
      res.status(201).json({ message: `${user} records updated` })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Delete User  -----
// DEL :  http://localhost:3025/user/
router.delete("/", validateSession, function (req, res) {
  let userid = req.user.id;

  const query = { where: { id: userid } };

  User.destroy(query)
    .then(() => res.status(200).json({ message: "User Deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get User  -----
// GET :  http://localhost:3025/user/
router.get("/", validateSession, (req, res) => {
  User.findOne({ where: { id: req.user.id } })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

// // -----  Get All Users  -----
// // GET :  http://localhost:3025/user/all
router.get("/all", validateSession, (req, res) => {
  if (req.user.role === true) {
    User.findAll()
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    return res.status(500).send("Not Authorized");
  }
});

module.exports = router;
