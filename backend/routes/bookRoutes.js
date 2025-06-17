const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controller/bookController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');


// Create Book - Admin only
router.post(
  '/create',                    // POST /api/books/
  authMiddleware,         // verify user is authenticated
  roleMiddleware('admin'),// verify user has 'admin' role
  upload.single('image'), // multer middleware to parse single file with field name 'image'
  createBook              // your controller function to handle book creation
);

// Get All Books - Public
router.get('/', getAllBooks);

// Get Single Book - Public
router.get('/:id', getBookById);

// Update Book - Admin only
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateBook);

// Delete Book - Admin only
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteBook);

module.exports = router;
