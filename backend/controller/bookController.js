const Book = require('../models/Books');

// Create Book (Admin only)
exports.createBook = async (req, res) => {
  try {
    // req.body has the text fields
    const { title, author, price, description, category, stock } = req.body;

    // Validate required fields
    if (!title || !author || !price) {
      return res.status(400).json({ error: 'title, author, and price are required' });
    }

    // req.file has the uploaded image info (Cloudinary URL will be in req.file.path)
    const image = req.file ? req.file.path : undefined;

    // Create new book document
    const newBook = new Book({
      title,
      author,
      price,
      description,
      category,
      stock: stock || 0,
      image,
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Book
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Book (Admin only)
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Book (Admin only)
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
