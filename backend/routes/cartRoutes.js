const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const cartController = require('../controller/cartController');

const router = express.Router();

router.post('/cart', authMiddleware, cartController.addToCart);
router.get('/cart', authMiddleware, cartController.getCart);
router.put('/cart', authMiddleware, cartController.updateCartItem);
router.delete('/cart/:bookId', authMiddleware, cartController.removeFromCart);

module.exports = router;
