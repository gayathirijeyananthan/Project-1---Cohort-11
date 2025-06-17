const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controller/orderController');

// User places order
router.post('/create', authMiddleware, createOrder);

// User views their orders
router.get('/myorders', authMiddleware, getUserOrders);

// Admin views all orders
router.get('/', authMiddleware, roleMiddleware('admin'), getAllOrders);

// Admin updates order status
router.put('/:id/status', authMiddleware, roleMiddleware('admin'), updateOrderStatus);

module.exports = router;
