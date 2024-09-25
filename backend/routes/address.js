const express = require('express');
const {
  addAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
} = require('../controller/admin-address');

const router = express.Router();

router.post('/address', addAddress);
router.get('/address/:userId', getAddressesByUserId);
router.put('/address/:userId', updateAddress);
router.delete('/address/:userId', deleteAddress);

module.exports = router;
