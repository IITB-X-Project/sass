const express = require('express');
const router = express.Router();
const { searchProduct } = require('../controller/search');


router.get('/product/:query', searchProduct);
//router.get('/history', getSearchHistory);
//router.delete('/history/:queryToRemove', removeFromSearchHistory);
module.exports = router;
