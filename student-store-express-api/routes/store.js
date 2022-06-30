const express = require("express");
const router = express.Router();
const Store = require("../models/store");

// get all previous purchases
router.get("/orders", (req, res) => {
  res.status(200).send({ orderHistory: Store.getOrderHistory() });
});

// get a previous purchase based on its id
router.get("/orders/:orderId", (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    res.status(200).send({ purchase: Store.getOrder(orderId) });
  } catch (e) {
    return next(e);
  }
});

// get a product currently in the shopping cart based on its id
router.get("/products/:productId", (req, res, next) => {
  try {
    const productId = req.params.productId;
    res.status(200).send({ product: Store.getProduct(productId) });
  } catch (e) {
    return next(e);
  }
});

// get all products currently in the shopping cart
router.get("", (req, res) => {
  res.status(200).send({ products: Store.getAllProducts() });
});

// add all products in the shopping cart to db
router.post("", (req, res) => {
  const newPurchase = Store.makePurchase(req.body.user, req.body.shoppingCart);
  res.status(201).send({ purchase: newPurchase });
});

module.exports = router;
