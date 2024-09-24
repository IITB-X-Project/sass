const express = require("express");
const {
    getOrdersByUserId
} = require("../controller/order");

const router = express.Router();

router.post("/order/user", getOrdersByUserId);


module.exports = router;
