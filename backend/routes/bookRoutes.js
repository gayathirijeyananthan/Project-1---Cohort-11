const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controller/bookController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

// Create Book - Admin only
router.post('/create', authMiddleware, roleMiddleware('admin'), createBook);

// Get All Books - Public
router.get('/', getAllBooks);

// Get Single Book - Public
router.get('/:id', getBookById);

// Update Book - Admin only
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateBook);

// Delete Book - Admin only
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteBook);

module.exports = router;
