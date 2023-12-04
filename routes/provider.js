const express = require('express');
const provider_router = express.Router();
const provider_controller = require('../controllers/provider');
const path = require("path");

provider_router.post("/createBook", provider_controller.createBook);
provider_router.post("/getBookDetail", provider_controller.getBookDetail);
provider_router.post("/updateBook", provider_controller.updateBook);
module.exports = provider_router;