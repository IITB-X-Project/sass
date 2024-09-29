const express = require("express");
const {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controller/admin-order");

const router = express.Router();

router.post("/order", createOrder);
router.get("/order/user", getOrdersByUserId);
router.get("/order/:id", getOrderById);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);


module.exports = router;