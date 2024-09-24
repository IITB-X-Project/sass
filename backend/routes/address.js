const express = require('express');
const {
  addAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
} = require('../controller/admin-address');

const router = express.Router();

router.post('/', addAddress);
router.get('/:userId', getAddressesByUserId);
router.put('/:userId', updateAddress);
router.delete('/:userId', deleteAddress);

module.exports = router;
