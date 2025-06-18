const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },  // you can store image URL
    category: { type: String },
    stock: { type: Number, default: 0 },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, required: true },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
// This code defines a Mongoose schema for a Book model in a Node.js application.cd 