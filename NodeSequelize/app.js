const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const app = express();
app.use(bodyParser.json());

// DataBase Conncetion
const sequelize = require("./utils/database");
// Importing Models for Assocaiation
const Product = require("./models/product");
const User = require("./models/user");

// Middleware for User assocaition mapping for the product realtionship mapping
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Rote Middleware
app.use("/api", productRoute);
app.use("/api", userRoute);
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

// Association of user and product relation before sync operation
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// Creating Table using Seqeulize
sequelize
  //.sync({ force: true }) // overwrite table
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
