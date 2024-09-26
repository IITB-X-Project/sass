const Address = require('../schema/address');
const Joi = require('joi');

const ResponseFlags = {
  SUCCESS: 0,
  USER_NOT_AUTHENTICATED: 1,
  ADDRESS_CREATED: 2,
  ADDRESS_UPDATED: 3,
  ADDRESS_DELETED: 4,
  ADDRESS_NOT_FOUND: 5,
  INVALID_INPUT: 6,
  SERVER_ERROR: 7
};

const addressSchema = Joi.object({
  address: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required()
});

const addAddressSchema = Joi.object({
  userId: Joi.string().required(),
  addresses: Joi.array().items(addressSchema).min(1).required()
});

const updateAddressSchema = Joi.object({
  addressId: Joi.string().required(),
  newAddress: Joi.string().required(),
  newPhone: Joi.string().pattern(/^[0-9]{10}$/).required()
});

// Create a new address for a user
const addAddress = async (req, res) => {
  try {
    const { error, value } = addAddressSchema.validate(req.body);
    if (error) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT, errors: error.details.map(d => d.message) });

    const newAddress = new Address(value);
    await newAddress.save();

    res.status(201).json({ flag: ResponseFlags.ADDRESS_CREATED, id: newAddress._id });
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Get all addresses for a user
const getAddressesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });
  }
    const addresses = await Address.findOne({ userId }).lean();
    if (!addresses) {
      return res.status(404).json({ flag: ResponseFlags.ADDRESS_NOT_FOUND });
    }
    res.status(200).json({ flag: ResponseFlags.SUCCESS, addresses: addresses.addresses });
  } catch (error) {
    console.error('Error retrieving addresses:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};
  

// Update an address for a user
const updateAddress = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });

    const { error, value } = updateAddressSchema.validate(req.body);
    if (error) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT, errors: error.details.map(d => d.message) });

    const { addressId, newAddress, newPhone } = value;

    const updatedAddress = await Address.findOneAndUpdate(
      { userId, 'addresses._id': addressId },
      { $set: { 'addresses.$.address': newAddress, 'addresses.$.phone': newPhone } },
      { new: true, lean: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ flag: ResponseFlags.ADDRESS_NOT_FOUND });
    }

    res.status(200).json({ flag: ResponseFlags.ADDRESS_UPDATED, id: addressId });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};
  

// Delete an address for a user
const deleteAddress = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });

    const { addressId } = req.body;
    if (!addressId) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT, errors: ['addressId is required'] });

    const updatedAddress = await Address.findOneAndUpdate(
      { userId },
      { $pull: { addresses: { _id: addressId } } },
      { new: true, lean: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ flag: ResponseFlags.ADDRESS_NOT_FOUND });
    }

    res.status(200).json({ flag: ResponseFlags.ADDRESS_DELETED });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Export all functions
module.exports = {
  addAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
};
