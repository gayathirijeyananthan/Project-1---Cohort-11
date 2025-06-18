const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, deleteUser, updateUser, getProfile,updateProfile} = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/register', register);
router.post('/login', login);

//Admin only routes
router.get('/allusers', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.delete('/deleteuser/:id', authMiddleware, roleMiddleware('admin'), deleteUser);
router.put('/updateuser/:id', authMiddleware, roleMiddleware('admin'), updateUser);
router.get('/profile', authMiddleware, getProfile);

//User can  Update profile
router.put('/profileupdate', authMiddleware, updateProfile);



module.exports = router;
