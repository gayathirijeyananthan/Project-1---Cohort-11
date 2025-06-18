const User = require('../models/User');


exports.addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const { bookId, quantity } = req.body;

    const itemIndex = user.cart.findIndex(item => item.book.toString() === bookId);

    if (itemIndex > -1) {
      // Book already in cart → update quantity
      user.cart[itemIndex].quantity += quantity;
    } else {
      // Add new book to cart
      user.cart.push({ book: bookId, quantity });
    }

    await user.save();

    res.json({ message: 'Book added to cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//View Cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.book', 'title author price');

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update Cart Item Quantity
exports.updateCartItem = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const { bookId, quantity } = req.body;

    const itemIndex = user.cart.findIndex(item => item.book.toString() === bookId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Book not found in cart' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is zero or less
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = quantity;
    }

    await user.save();

    res.json({ message: 'Cart updated', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const { bookId } = req.params;

    user.cart = user.cart.filter(item => item.book.toString() !== bookId);

    await user.save();

    res.json({ message: 'Book removed from cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

