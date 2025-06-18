const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user);
    res.status(201).json({ token, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.json({ token, user, message: "You successfully loged in" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Admin only
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // .select('-password');  // Don't send passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Admin only
//Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Admin only
// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user profile by ID
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//User can update their own profile
// Update own profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Current logged-in user

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      // Update password if provided
      if (req.body.password) {
        user.password = req.body.password; // must hash in User model pre-save hook
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
