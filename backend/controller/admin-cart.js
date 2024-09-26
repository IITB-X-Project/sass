const Cart = require('../schema/cart'); 
const User = require('../schema/user');
const Joi = require('joi');

const ResponseFlags = {
  SUCCESS: 0,
  USER_NOT_AUTHENTICATED: 1,
  CART_CREATED: 2,
  CART_UPDATED: 3,
  CART_DELETED: 4,
  CART_NOT_FOUND: 5,
  INVALID_INPUT: 6,
  SERVER_ERROR: 7,
  OUTSTANDING_DUES: 8
};

const cartItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});

const cartSchema = Joi.object({
  items: Joi.array().items(cartItemSchema).min(1).required()
});

// Create a new cart
const createCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });

    const user = await User.findById(userId).lean();
    if (user.duesAmount < 0) {
      return res.status(403).json({ flag: ResponseFlags.OUTSTANDING_DUES });
    }

    const { error, value } = cartSchema.validate(req.body);
    if (error) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT, errors: error.details.map(d => d.message) });

    const cart = new Cart({ userId, items: value.items });
    await cart.save();
    res.status(201).json({ flag: ResponseFlags.CART_CREATED, id: cart._id });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Get a cart by userId
const getCartByUserId = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId){
      return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });
    } 

    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price').lean();
    if (!cart) {
      return res.status(404).json({ flag: ResponseFlags.CART_NOT_FOUND });
    }
    res.status(200).json({ flag: ResponseFlags.SUCCESS, cart });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Update cart items
const updateCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });

    const { error, value } = cartSchema.validate(req.body);
    if (error) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT, errors: error.details.map(d => d.message) });

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items: value.items },
      { new: true, runValidators: true }
    ).populate('items.productId', 'name price').lean();

    if (!updatedCart) {
      return res.status(404).json({ flag: ResponseFlags.CART_NOT_FOUND });
    }

    res.status(200).json({ flag: ResponseFlags.CART_UPDATED, id: updatedCart._id });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Delete cart
const deleteCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });

    const deletedCart = await Cart.findOneAndDelete({ userId }).lean();
    if (!deletedCart) {
      return res.status(404).json({ flag: ResponseFlags.CART_NOT_FOUND });
    }

    res.status(200).json({ flag: ResponseFlags.CART_DELETED });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};

module.exports = {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
};
