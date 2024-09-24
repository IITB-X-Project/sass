const Order = require('../schema/order'); 




const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.session.userId; 
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const orders = await Order.find({ userId });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({orders});
  } catch (error) {
    res.status(500).json({ error:"error while fetching order" });
  }
};

module.exports = {
  getOrdersByUserId,
};

