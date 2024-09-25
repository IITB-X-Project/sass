const Order = require('../schema/order');

const ResponseFlags = {
  SUCCESS: 0,
  USER_NOT_AUTHENTICATED: 1,
  NO_ORDERS_FOUND: 2,
  SERVER_ERROR: 3
};

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

module.exports = {
  getOrdersByUserId,
};

