const express = require("express");
const router = express.Router();
// Importing Product Model
const Product = require("../models/product");

router.get("/productTest", (req, res) => {
  res.json("ProductRouteWorking");
});

router.post("/product", (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //create method define a new element based on that model and save to the database
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
    .then(result => {
      res.json({ msg: "Products added succesfully", response: result });
    })
    .catch(err => {
      next(err, req, res, next);
    });
});

router.get("/products", (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      next(err, req, res, next);
    });
});

router.get("/product/:id", (req, res, next) => {
  const prodId = req.params.id;
  Product.findByPk(prodId)
    .then(Product => {
      res.json(Product);
    })
    .catch(err => {
      next(err, req, res, next);
    });
  // Alternate Approach
  // findAll({where:{id:prodId}}).then().catch() ==> result gives an array
});

router.put("/product/:id", (req, res, next) => {
  const prodId = req.params.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.update(
    {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl
    },
    { returning: true, where: { id: prodId } }
  )
    //But i want result to be returned in object
    .then(result => {
      res.json("Updated succesfully");
    })
    .catch(err => {
      next(err, req, res, next);
    });
});

router.delete("/product/:id", (req, res, next) => {
  const prodId = req.params.id;
  Product.destroy({ where: { id: prodId } })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err, req, res, next);
    });
});

module.exports = router;
