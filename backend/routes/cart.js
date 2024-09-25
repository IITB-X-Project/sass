const express = require('express');
const router = express.Router();
const {createCart,getCartByUserId,updateCart,deleteCart} = require('../controller/admin-cart');


router.post('/cart',createCart);

router.get('/cart/:userId', getCartByUserId);

router.put('/cart/:userId',updateCart);

router.delete('/cart/:userId',deleteCart);

module.exports = router;
