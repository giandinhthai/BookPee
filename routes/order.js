const express = require('express');
const order_router = express.Router();
const order_controller = require('../controllers/order');
const path = require("path");

order_router.get("/", order_controller.getAllBooks);
order_router.post("/search", order_controller.search);
module.exports = order_router;