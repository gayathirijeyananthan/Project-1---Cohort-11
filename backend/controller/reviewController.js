const Book = require('../models/Books');

// Add review
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  const alreadyReviewed = book.reviews.find(
    r => r.user.toString() === req.user.id
  );

  if (alreadyReviewed) {
    return res.status(400).json({ message: 'Book already reviewed by user' });
  }

  const review = {
    user: req.user.id,
    rating: Number(rating),
    comment
  };

  book.reviews.push(review);
  book.numReviews = book.reviews.length;
  book.averageRating =
    book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length;

  await book.save();
  res.status(201).json({ message: 'Review added' });
};


// Get all reviews for a specific book
exports.getReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select('reviews averageRating numReviews');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({
      reviews: book.reviews,
      averageRating: book.averageRating,
      numReviews: book.numReviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
