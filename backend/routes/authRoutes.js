const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/register', register);
router.post('/login', login);

// Example protected routes
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.send('Welcome Admin');
});

router.get('/profile', authMiddleware, roleMiddleware('User'), (req, res) => {
  res.send(`Welcome ${req.user.role}`);
});

module.exports = router;
