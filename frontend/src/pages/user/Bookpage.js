import React, { useEffect, useState } from 'react';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/book')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, quantity: 1 }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Book added to cart!');
      } else {
        alert(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <section style={{ padding: '40px' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Books Page</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              width: '250px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <img
              src={book.image}
              alt={book.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{book.title}</h3>
            <p style={{ marginBottom: '10px' }}>{book.author}</p>
            <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>Rs {book.price}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => handleAddToCart(book._id)}
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <button
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Pay
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BooksPage;
