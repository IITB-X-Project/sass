const Address = require('../schema/address')




// Create a new address for a user
const addAddress = async (req, res) => {
    try {
      const { userId, addresses } = req.body;
      const newAddress = new Address({ userId, addresses });
      await newAddress.save();
  
      res.status(201).json(newAddress);
    } catch (error) {
      console.error('Error creating address:', error);
      res.status(500).json({ error: 'Error creating address', details: error.message });
    }
  };




// Get all addresses for a user
const getAddressesByUserId = async (req, res) => {
    try {
      const {userId}=req.params; 
      if (!userId) return res.status(401).json({ message: 'User not authenticated' });
      const addresses = await Address.findOne({ userId });
  
      if (!addresses) {
        return res.status(404).json({ error: 'Addresses not found' });
      }
  
      res.status(200).json(addresses);
    } catch (error) {
      console.error('Error retrieving addresses:', error);
      res.status(500).json({ error: 'Error retrieving addresses', details: error.message });
    }
  };
  

// Update an address for a user
const updateAddress = async (req, res) => {
    try {
      const userId = req.session.userId; 
      if (!userId) return res.status(401).json({ message: 'User not authenticated' });
      const { addressId, newAddress, newPhone } = req.body;
  
      const updatedAddress = await Address.findOneAndUpdate(
        { userId, 'addresses._id': addressId },
        { $set: { 'addresses.$.address': newAddress, 'addresses.$.phone': newPhone } },
        { new: true }
      );
  
      if (!updatedAddress) {
        return res.status(404).json({ error: 'Address not found' });
      }
  
      res.status(200).json(updatedAddress);
    } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ error: 'Error updating address', details: error.message });
    }
  };
  

// Delete an address for a user
const deleteAddress = async (req, res) => {
  try {
    const userId = req.session.userId; 
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });
    const { addressId } = req.body;

    const updatedAddress = await Address.findOneAndUpdate(
      { userId },
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully', updatedAddress });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Error deleting address', details: error.message });
  }
};




// Export all functions
module.exports = {
  addAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
};