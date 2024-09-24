const Cart = require('../schema/cart'); 

// Create a new cart
const createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const cart = new Cart({ userId, items });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Error creating cart', details: error.message });
  }
};

// Get a cart by userId
const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Error retrieving cart', details: error.message });
  }
};

// Update cart items
const updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, runValidators: true }
    ).populate('items.productId');

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Error updating cart', details: error.message });
  }
};

// Delete cart
const deleteCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedCart = await Cart.findOneAndDelete({ userId });
    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(204).json({message:'cart is empty'}); // No content
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Error deleting cart', details: error.message });
  }
};

// Export all functions
module.exports = {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
};
