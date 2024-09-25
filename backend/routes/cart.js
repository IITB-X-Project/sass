const express = require('express');
const router = express.Router();
const {createCart,getCartByUserId,updateCart,deleteCart} = require('../controller/admin-cart');


router.post('/',createCart);

router.get('/:userId', getCartByUserId);

router.put('/:userId',updateCart);

router.delete('/:userId',deleteCart);

module.exports = router;
