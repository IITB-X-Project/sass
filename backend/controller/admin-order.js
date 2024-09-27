const Order = require("../schema/order");


// Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.session.userId; 
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const {cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, paymentId, payerId } = req.body;

    const newOrder = await Order.create({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId,
      payerId,
    });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};




// Get Orders by UserId
const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.session.userId; 
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const orders = await Order.find({ userId });
    if (orders.length === 0) return res.status(404).json({ message: 'No orders found for this user' });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};




// Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
};




// Update Order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, paymentId, payerId } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        cartItems,
        cartId,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderUpdateDate: new Date(),
        paymentId,
        payerId,
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
};




// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};




module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  updateOrder,
  deleteOrder
};