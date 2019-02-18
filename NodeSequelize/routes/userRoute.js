const express = require("express");
const router = express.Router();
// Importing User Model
const User = require("../models/user");

router.get("/userTest", (req, res) => {
  res.json("userRouteWorking");
});

router.post("/addUser", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  //create method define a new element based on that model and save to the database
  User.create({
    name: name,
    email: email
  })
    .then(result => {
      res.json({ msg: "Products added succesfully", response: result });
    })
    .catch(err => {
      next(err, req, res, next);
    });
});

module.exports = router;
