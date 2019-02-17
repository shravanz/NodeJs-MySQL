const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("./routes/productRoute");

const app = express();
app.use(bodyParser.json());

//DataBase Conncetion
const sequelize = require("./utils/database");

//Rote Middleware
app.use("/api", productRoute);
// Middleware to handle "Resource Not Found" errors
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.name = "NotFoundError";
  err.status = 404;
  next(err, req, res, next);
});
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).json(err);
});

// Creating Table using Seqeulize
sequelize
  .sync()
  .then(result => {
    // console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

const port = 3001;
app.listen(port, () => {
  console.log(`App Started`);
});
