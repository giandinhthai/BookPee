const express = require('express');
const order_router = express.Router();
const order_controller = require('../controllers/order');
const path = require("path");

order_router.get("/", order_controller.getAllBooks);
order_router.get("/genres", order_controller.getAllGenres);
order_router.post("/search", order_controller.search);
order_router.post("/filter", order_controller.filter);
order_router.post("/detail", order_controller.getDetail);
module.exports = order_router;