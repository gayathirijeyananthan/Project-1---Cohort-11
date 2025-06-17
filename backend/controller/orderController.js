const Order = require('../models/Order');
const Book = require('../models/Books');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;  // from authMiddleware
    const { books } = req.body;   // array of { book: bookId, quantity }

    if (!books || !books.length) {
      return res.status(400).json({ message: 'No books provided' });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of books) {
      const book = await Book.findById(item.book);
      if (!book) {
        return res.status(404).json({ message: `Book not found: ${item.book}` });
      }
      totalPrice += book.price * item.quantity;
    }

    const order = new Order({
      user: userId,
      books,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get all orders for logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate('books.book', 'title price author');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('books.book', 'title price author');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all orders', error: error.message });
  }
};

// Admin: update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    if (!['pending', 'shipped', 'delivered', 'canceled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};
