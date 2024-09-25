
const Order = require('../schema/order');
const Joi = require('joi');

const ResponseFlags = {
  SUCCESS: 0,
  USER_NOT_AUTHENTICATED: 1,
  NO_ORDERS_FOUND: 2,
  SERVER_ERROR: 3,
  ORDER_CREATED: 4,
  ORDER_UPDATED: 5,
  ORDER_DELETED: 6,
  ORDER_NOT_FOUND: 7,
  INVALID_INPUT: 8
};

const orderSchema = Joi.object({
  cartId: Joi.string().required(),
  cartItems: Joi.array().items(Joi.object()).min(1).required(),
  addressInfo: Joi.object().required(),
  orderStatus: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  paymentStatus: Joi.string().required(),
  totalAmount: Joi.number().min(0).required(),
  paymentId: Joi.string().allow(null, ''),
  payerId: Joi.string().allow(null, '')
});

// Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });

    const { error, value } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT, errors: error.details.map(d => d.message) });

    const newOrder = await Order.create({
      userId,
      ...value,
      orderDate: new Date(),
      orderUpdateDate: new Date()
    });

    res.status(201).json({ flag: ResponseFlags.ORDER_CREATED, id: newOrder._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Get Orders by UserId
const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ flag: ResponseFlags.USER_NOT_AUTHENTICATED });
    }

    const orders = await Order.find({ userId })
      .select('orderNumber totalAmount status createdAt')
      .lean();

    if (orders.length === 0) {
      return res.status(404).json({ flag: ResponseFlags.NO_ORDERS_FOUND });
    }

    res.status(200).json({ flag: ResponseFlags.SUCCESS, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) return res.status(404).json({ flag: ResponseFlags.ORDER_NOT_FOUND });

    res.status(200).json({ flag: ResponseFlags.SUCCESS, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};



// Update Order
const updateOrder = async (req, res) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT, errors: error.details.map(d => d.message) });

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...value,
        orderUpdateDate: new Date()
      },
      { new: true, lean: true }
    );

    if (!updatedOrder) return res.status(404).json({ flag: ResponseFlags.ORDER_NOT_FOUND });

    res.status(200).json({ flag: ResponseFlags.ORDER_UPDATED, id: updatedOrder._id });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};



// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id).lean();
    if (!deletedOrder) return res.status(404).json({ flag: ResponseFlags.ORDER_NOT_FOUND });

    res.status(200).json({ flag: ResponseFlags.ORDER_DELETED });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};



module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  updateOrder,
  deleteOrder
};

